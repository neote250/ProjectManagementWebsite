import { Card } from '@/components/ui/card';
import PropTypes from 'prop-types';

const ProjectCard = ({ project }) => {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-gray-500 mb-1">{project.number}</div>
          <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
          <p className="text-gray-600">{project.description}</p>
        </div>
      </div>
    </Card>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    number: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    hours: PropTypes.string.isRequired,
    taskDifficulty: PropTypes.string.isRequired,
    time: PropTypes.int.isRequired,
    estimatedTime: PropTypes.int.isRequired,
  }).isRequired,
};

// hours, task, people, task difficulty, time, and estimated time
//             Check box
export default ProjectCard;