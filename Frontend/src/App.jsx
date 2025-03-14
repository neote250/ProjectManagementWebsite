import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from './components/layout/Header';
import ProjectList from './components/projects/ProjectList';
import ProjectDashboard from './components/layout/ProjectDashboard';
import LoginPage from './components/projects/LoginPage';
import { ProjectProvider } from './context/ProjectContext';
import './styles/globals.css';

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    const response = await fetch("https://projectmanagement-brucewayne52411s-projects.vercel.app/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      setUser(data.user);
    }
  };

  const handleLogin = (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <ProjectProvider>
      <Router>
        <div className="min-h-screen bg-blue-100">
          <Header onLogout={handleLogout} user={user} />
          <main className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
              <Route path="/projects" element={user ? <ProjectList user={user} /> : <Navigate to="/login" />} />
              <Route path="/projects/:projectId" element={<ProjectDashboard />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ProjectProvider>
  );
};

export default App;
