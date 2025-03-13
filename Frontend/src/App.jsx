import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from './components/layout/Header';
import ProjectList from './components/projects/ProjectList';
import ProjectDashboard from './components/layout/ProjectDashboard';
import LoginPage from './components/projects/LoginPage'; // Import LoginPage component
import { ProjectProvider } from './context/ProjectContext';
import './styles/globals.css';

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [user, setUser] = useState(null); // Store user data
  const [token, setToken] = useState(null); // Store JWT token

  // Check for token in localStorage on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token); // Store the token in state
      fetchUserData(token); // Fetch user data based on token
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch("http://localhost:5000/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user); // Set user data after successful response
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogin = (userData, token) => {
    localStorage.setItem("token", token); // Store the token in localStorage
    setUser(userData); // Set user data in state
    setToken(token); // Set token in state
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token on logout
    setUser(null); // Clear user state
    setToken(null); // Clear token state
  };

  return (
    <ProjectProvider>
      <Router>
        <div className="min-h-screen bg-blue-100">
          <Header />
          <main className="max-w-7xl mx-auto">
            <Routes>
              {/* Route for LoginPage */}
              <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

              {/* Protected route for ProjectList */}
              <Route
                path="/projects"
                element={user ? (
                  <ProjectList user={user} />
                ) : (
                  <Navigate to="/login" /> // Redirect to login if user is not authenticated
                )}
              />

              {/* Route for ProjectDashboard */}
              <Route
                path="/projects/:id"
                element={<ProjectDashboard />}
              />

              {/* Redirect to login if the user tries to access an undefined route */}
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ProjectProvider>
  );
};

export default App;
