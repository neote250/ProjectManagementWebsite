import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";

const ProjectList = ({ onSelectProject }) => {  // ✅ Updated prop name
    const [projects, setProjects] = useState([]);
    const [isGridView, setIsGridView] = useState(true);

    const handleCreateProject = () => {
        const newProject = {
            id: projects.length + 1,
            name: `Project ${projects.length + 1}`,
            description: "This is a test project.",
        };
        setProjects([...projects, newProject]);
    };

    return (
        <div className="p-4">
            {/* Header with Button & Toggle */}
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={handleCreateProject}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Create Project
                </button>

                {/* Toggle Button */}
                <button 
                    onClick={() => setIsGridView(!isGridView)} 
                    className="p-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    {isGridView ? <List className="w-5 h-5" /> : <LayoutGrid className="w-5 h-5" />}
                </button>
            </div>

            {/* Project List */}
            <div className={isGridView ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "space-y-4"}>
                {projects.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">No projects available</p>
                ) : (
                    projects.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => onSelectProject && onSelectProject(project)} // ✅ Updated
                            className={`border border-gray-300 bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow cursor-pointer ${
                                isGridView ? "" : "flex items-center space-x-4"
                            }`}
                        >
                            <div>
                                <h2 className="text-xl font-bold">{project.name}</h2>
                                <p className="text-gray-600">{project.description}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProjectList;
