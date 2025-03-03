import { useState } from "react";
import PropTypes from "prop-types";
import { Bell, User } from "lucide-react";
import LoginPage from "../projects/LoginPage"; // Import the LoginPage component

const Header = ({ variant }) => {
    const [showLogin, setShowLogin] = useState(false);
    const [user, setUser] = useState(null);

    const handleLogin = (email) => {
        setUser(email);
        setShowLogin(false); // Close the login form after logging in
    };

    const headerStyles =
        variant === "dark"
            ? "bg-gray-900 text-white"
            : "bg-white text-yellow-800 shadow-sm";

    return (
        <>
            <header className={`${headerStyles} p-4`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-xl font-bold">ProjectHub</div>
                    <div className="flex items-center gap-4">
                        <Bell className="w-5 h-5 cursor-pointer hover:text-gray-400" />
                        {user ? (
                            <span className="text-sm font-semibold">{user}</span>
                        ) : (
                            <User 
                                className="w-5 h-5 cursor-pointer hover:text-gray-400"
                                onClick={() => setShowLogin(true)}
                            />
                        )}
                    </div>
                </div>
            </header>

            {/* Render Login Page when showLogin is true */}
            {showLogin && <LoginPage onLogin={handleLogin} />}
        </>
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
