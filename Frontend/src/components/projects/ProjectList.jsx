import { useState } from "react";

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    const handleCreateProject = () => {
        const newProject = {
            id: projects.length + 1,
            name: `Project ${projects.length + 1}`,
            description: "This is a test project.",
        };
        setProjects([...projects, newProject]);
    };

    return (
        <div>
            <button
                onClick={handleCreateProject}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Create Project
            </button>

            <div className="project-list mt-4">
                {projects.length === 0 ? (
                    <p>No projects available</p>
                ) : (
                    projects.map((project) => (
                        <div key={project.id} className="project-card border border-black-300 rounded-lg p-5 shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-1">
                            <h2 className="text-xl font-bold">{project.name}</h2>
                            <p>{project.description}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ProjectList;
