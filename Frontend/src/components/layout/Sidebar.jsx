import PropTypes from "prop-types";
import { Card } from "@/components/ui/Card";

const ProjectCard = ({ project }) => {
    return (
        <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="text-sm text-gray-500">{project.number}</div>
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <p className="text-gray-600">{project.description}</p>
        </Card>
    );
};

// ✅ PropTypes Validation
ProjectCard.propTypes = {
    project: PropTypes.shape({
        id: PropTypes.number.isRequired,
        number: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
};

export default ProjectCard;
