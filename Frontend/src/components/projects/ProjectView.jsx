import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [isGridView, setIsGridView] = useState(true);

    const handleCreateProject = () => {
        const newProject = {
            id: projects.length + 1,
            name: `Project ${projects.length + 1}`,
            description: "This is a test project.",
            createdAt: new Date().toLocaleDateString(),
            status: "Active",
        };
        setProjects([...projects, newProject]);
    };

    const handleDeleteProject = (id) => {
        setProjects(projects.filter((project) => project.id !== id));
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={handleCreateProject}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {projects.length === 0 ? "Create First Project" : "Add New Project"}
                </button>

                <button 
                    onClick={() => setIsGridView(!isGridView)} 
                    className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    {isGridView ? <List className="w-5 h-5" /> : <LayoutGrid className="w-5 h-5" />}
                </button>
            </div>

            <div className={isGridView ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "space-y-4"}>
                {projects.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">No projects available</p>
                ) : (
                    projects.map((project) => (
                        <div
                            key={project.id}
                            className={`border border-gray-300 bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow ${isGridView ? "" : "flex items-center space-x-4"}`}
                        >
                            <div>
                                <h2 className="text-xl font-bold">{project.name}</h2>
                                <p className="text-gray-600">{project.description}</p>
                                <p className="text-sm text-gray-500">Created on: {project.createdAt}</p>
                                <p className={`text-sm ${project.status === "Active" ? "text-green-500" : "text-red-500"}`}>
                                    Status: {project.status}
                                </p>
                                <button 
                                    onClick={() => handleDeleteProject(project.id)} 
                                    className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProjectList;
