import PropTypes from "prop-types";
import { Bell, User } from "lucide-react";

const Header = ({ variant }) => {
    const headerStyles =
        variant === "dark"
            ? "bg-gray-900 text-white"
            : "bg-white text-yellow-800 shadow-sm";

    return (
        <header className={`${headerStyles} p-4`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-xl font-bold">ProjectHub</div>
                <div className="flex items-center gap-4">
                    <Bell className="w-5 h-5 cursor-pointer hover:text-gray-400" />
                    <User className="w-5 h-5 cursor-pointer hover:text-gray-400" />
                </div>
            </div>
        </header>
    );
};

// Define PropTypes
Header.propTypes = {
    variant: PropTypes.oneOf(["light", "dark"]),
};

// Default props
Header.defaultProps = {
    variant: "light",
};

export default Header;
