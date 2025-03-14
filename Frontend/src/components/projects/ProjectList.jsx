import { useState, useEffect } from "react";
import { LayoutGrid, List, PlusCircle, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import navigate hook

const ProjectList = ({ user }) => {
  const [projects, setProjects] = useState([]); // State to store projects
  const [isGridView, setIsGridView] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    taskDifficulty: 1,
    estimatedTime: 0,
  });

  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Fetch projects when user is logged in
  useEffect(() => {
    if (user) {
      fetchProjects(); // Call fetchProjects when user is available
    }
  }, [user]);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch("http://localhost:5000/api/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      console.log("Fetched Projects:", data); // Log the fetched data
      setProjects(data); // Set projects state with the fetched data
    } catch (error) {
      console.error("Error fetching projects:", error.message);
      setError(error.message); // Set error state
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Authentication required");
      }

      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const data = await response.json();

      // Add new project to the list (Only add once creation is successful)
      setProjects((prevProjects) => [data, ...prevProjects]);

      // Reset form and hide it
      setNewProject({
        name: "",
        description: "",
        taskDifficulty: 1,
        estimatedTime: 0,
      });
      setShowCreateForm(false); // Close the create form after successful submission
    } catch (error) {
      setError(error.message);
    }
  };

  // Navigate to the ProjectDashboard and pass the selected project
  const handleProjectClick = (project) => {
    navigate(`/projects/${project._id}`, { state: { project } }); // Pass project details to the route
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header with Create Button & Layout Toggle */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)} // Toggle create form visibility
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Create Project
        </button>

        {/* Layout Toggle Button */}
        <button
          onClick={() => setIsGridView(!isGridView)}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          {isGridView ? <List className="w-5 h-5" /> : <LayoutGrid className="w-5 h-5" />}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Create Project Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-md p-5 mb-6">
          <h2 className="text-xl font-bold mb-4">Create New Project</h2>
          <form onSubmit={handleCreateProject} className="space-y-4">
            {/* Add form fields here */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter project name"
                name="name"
                value={newProject.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="w-full p-2 border rounded mt-1"
                placeholder="Enter project description"
                name="description"
                value={newProject.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Task Difficulty (1-5)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded mt-1"
                  name="taskDifficulty"
                  value={newProject.taskDifficulty}
                  onChange={handleInputChange}
                  min="1"
                  max="5"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Estimated Time (hrs)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded mt-1"
                  name="estimatedTime"
                  value={newProject.estimatedTime}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
              Create Project
            </button>
          </form>
        </div>
      )}

      {/* Project List */}
      <div
        className={
          isGridView
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            : "space-y-4"
        }
      >
        {projects.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 py-8">
            No projects available. Create your first project!
          </p>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              onClick={() => handleProjectClick(project)} // Call handleProjectClick when a project is clicked
              className={`border border-gray-300 bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow cursor-pointer ${isGridView ? "" : "flex items-center space-x-4"}`}
            >
              <h2 className="text-xl font-bold">{project.name}</h2>
              <p className="text-gray-600 my-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  Difficulty: {project.taskDifficulty}/5
                </span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  Est. Hours: {project.estimatedTime}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProjectList;
