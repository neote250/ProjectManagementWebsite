const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Define User Schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: "user" },
    createdAt: { type: Date, default: Date.now },
});

// Define Project Schema
const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    taskDifficulty: { type: Number },
    estimatedTime: { type: Number },
    actualHours: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Project = mongoose.model("Project", projectSchema);

// Generate JWT token dynamically using the user's details
const generateJWT = (user) => {
    return jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET, // Use JWT_SECRET from the environment variables
        { expiresIn: "1d" } // 1 day expiration time for the token
    );
};

// Middleware to verify JWT token
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using the secret from .env
        const user = await User.findOne({ _id: decoded.userId });
        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        req.token = token;
        req.user = user;
        next(); // Continue to the next middleware or route handler
    } catch (error) {
        console.error("Authorization failed:", error);
        res.status(401).json({ message: "Authentication required" });
    }
};

// Authentication Routes
app.post("/api/register", async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            email,
            password: hashedPassword,
            name,
        });

        await user.save();

        // Generate JWT token using the new user details
        const token = generateJWT(user);

        res.status(201).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token using the user's details
        const token = generateJWT(user);

        res.json({
            token, // Send the token back to the frontend
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// User Route (with auth middleware)
app.get("/api/user", auth, async (req, res) => {
    try {
        res.json({ user: req.user }); // Return user info based on token
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Project Routes
app.post("/api/projects", auth, async (req, res) => {
    try {
        const { name, description, taskDifficulty, estimatedTime } = req.body;

        const project = new Project({
            name,
            description,
            taskDifficulty,
            estimatedTime,
            createdBy: req.user._id,
            members: [req.user._id],
        });

        await project.save();
        res.status(201).json(project);
    } catch (error) {
        console.error("Create project error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get("/api/projects", auth, async (req, res) => {
    try {
        const projects = await Project.find({ members: req.user._id })
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        res.json(projects);
    } catch (error) {
        console.error("Get projects error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
