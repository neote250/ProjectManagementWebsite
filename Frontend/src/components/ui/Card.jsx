import PropTypes from "prop-types";

const Card = ({ children, className }) => {
    return (
        <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
            {children}
        </div>
    );
};

// ✅ PropTypes Validation
Card.propTypes = {
    children: PropTypes.node.isRequired, // Ensures the Card has content inside
    className: PropTypes.string, // Allows custom styling classes
};

// ✅ Default Props
Card.defaultProps = {
    className: "", // If no custom class is provided, defaults to an empty string
};

export default Card;
