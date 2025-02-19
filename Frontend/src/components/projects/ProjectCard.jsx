import ProjectCard from "@/components/projects/ProjectCard";
import { useProjects } from "@/context/ProjectContext";

const ProjectList = () => {
    const { projects } = useProjects(); // Get projects from context

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
                projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))
            ) : (
                <p className="text-gray-500 text-center col-span-3">No projects available.</p>
            )}
        </div>
    );
};

export default ProjectList;
