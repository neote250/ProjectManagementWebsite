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

// Define Task Schema
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    priority: { type: String, enum: ["Low", "Medium", "High", "Urgent"], default: "Medium" },
    dueDate: { type: Date },
    completed: { type: Boolean, default: false },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Define Document Schema
const documentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String },
    size: { type: String },
    uploadedAt: { type: Date, default: Date.now },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// Define Timeline Schema
const timelineSchema = new mongoose.Schema({
    action: { type: String, required: true },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    details: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    timestamp: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Project = mongoose.model("Project", projectSchema);
const Task = mongoose.model("Task", taskSchema);
const Document = mongoose.model("Document", documentSchema);
const Timeline = mongoose.model("Timeline", timelineSchema);

// Generate JWT token
const generateJWT = (user) => {
    return jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
};

// Authentication middleware
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({ message: "Authentication required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.userId });
        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.error("Authorization failed:", error);
        res.status(401).json({ message: "Authentication required" });
    }
};

// Authentication Routes
app.post("/api/register", async (req, res) => {
    try {
        const { email, password, name } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            email,
            password: hashedPassword,
            name,
        });

        await user.save();
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

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateJWT(user);

        res.json({
            token,
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

// Project Routes
app.post("/api/projects", auth, async (req, res) => {
    try {
        const { name, description, taskDifficulty, estimatedTime, members } = req.body;

        const project = new Project({
            name,
            description,
            taskDifficulty,
            estimatedTime,
            createdBy: req.user._id,
            members: [req.user._id, ...members],  // Add the logged-in user and the others
        });

        await project.save();
        res.status(201).json(project);
    } catch (error) {
        console.error("Create project error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Fetch all projects for the logged-in user
app.get("/api/projects", auth, async (req, res) => {
    try {
        const projects = await Project.find({ createdBy: req.user._id })
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        res.json(projects);
    } catch (error) {
        console.error("Get projects error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Fetch project details
app.get("/api/projects/:projectId", auth, async (req, res) => {
    const { projectId } = req.params;

    try {
        const project = await Project.findById(projectId)
            .populate("createdBy", "name email")
            .populate("members", "name email")
            .exec();

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json(project);
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Add a task to a project
app.post("/api/projects/:projectId/tasks", auth, async (req, res) => {
    const { projectId } = req.params;
    const { title, assignee, priority, dueDate, description } = req.body;

    try {
        const task = new Task({
            title,
            assignee,
            priority,
            dueDate,
            description,
            projectId,
        });

        await task.save();

        const timelineEntry = new Timeline({
            action: "Task Added",
            taskId: task._id,
            details: `Task '${task.title}' added to the project`,
            userId: req.user._id,
            projectId,
        });
        await timelineEntry.save();

        res.status(201).json(task);
    } catch (error) {
        console.error("Create task error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Upload a document for a project
app.post("/api/projects/:projectId/documents", auth, async (req, res) => {
    const { projectId } = req.params;
    const { name, type, uploadedBy } = req.body;

    try {
        const document = new Document({
            name,
            type,
            uploadedBy,
            projectId,
        });

        await document.save();

        res.status(201).json(document);
    } catch (error) {
        console.error("Upload document error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
