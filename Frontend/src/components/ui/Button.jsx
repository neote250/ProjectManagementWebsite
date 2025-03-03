import PropTypes from "prop-types";

const Button = ({ children, onClick, className, type, disabled }) => {
    return (
        <button
            type={type}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${disabled
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                } ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

// ✅ PropTypes Validation
Button.propTypes = {
    children: PropTypes.node.isRequired, // Ensures content inside the button
    onClick: PropTypes.func, // Function to handle button clicks
    className: PropTypes.string, // Allows extra styling
    type: PropTypes.oneOf(["button", "submit", "reset"]), // Limits button types
    disabled: PropTypes.bool, // Handles disabled state
};

// ✅ Default Props
Button.defaultProps = {
    onClick: () => { }, // Default to no action
    className: "", // No extra styling by default
    type: "button", // Defaults to a regular button
    disabled: false, // Button is enabled by default
};

export default Button;
