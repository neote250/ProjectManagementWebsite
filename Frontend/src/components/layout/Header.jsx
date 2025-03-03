import { useState } from "react";
import PropTypes from "prop-types";
import { Bell, User, X, ArrowLeft, Check } from "lucide-react";
import LoginPage from "../projects/LoginPage";

const Header = ({ variant }) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAllNotifications, setShowAllNotifications] = useState(false);
    const [user, setUser] = useState(null);
    
    // Sample notifications data - in a real app, this would come from an API or props
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "New comment on your project",
            message: "John Doe commented on your Design System project",
            time: "10 minutes ago",
            read: false
        },
        {
            id: 2,
            title: "Project deadline reminder",
            message: "The Marketing Website project is due tomorrow",
            time: "1 hour ago",
            read: false
        },
        {
            id: 3,
            title: "Team meeting scheduled",
            message: "Weekly team meeting at 2:00 PM on Thursday",
            time: "3 hours ago",
            read: true
        },
        {
            id: 4,
            title: "New team member added",
            message: "Sarah Johnson has joined the Design Team",
            time: "1 day ago",
            read: true
        },
        {
            id: 5,
            title: "Task assigned to you",
            message: "You've been assigned to review the new homepage design",
            time: "2 days ago",
            read: true
        },
        {
            id: 6,
            title: "Project status update",
            message: "E-commerce App project is now 75% complete",
            time: "3 days ago",
            read: true
        }
    ]);

    const handleLogin = (email) => {
        setUser(email);
        setShowLogin(false);
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
        if (showAllNotifications) setShowAllNotifications(false);
    };

    const openAllNotifications = () => {
        setShowNotifications(false);
        setShowAllNotifications(true);
    };

    const closeAllNotifications = () => {
        setShowAllNotifications(false);
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(notification => 
            notification.id === id ? { ...notification, read: true } : notification
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(notification => ({ ...notification, read: true })));
    };
    
    const unreadCount = notifications.filter(notification => !notification.read).length;

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
                        <div className="relative">
                            <Bell 
                                className="w-5 h-5 cursor-pointer hover:text-gray-400" 
                                onClick={toggleNotifications}
                            />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                            
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                                    <div className="p-3 border-b flex justify-between items-center">
                                        <h3 className="font-semibold text-gray-800">Notifications</h3>
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={markAllAsRead}
                                                className="text-xs text-blue-600 hover:text-blue-800"
                                            >
                                                Mark all as read
                                            </button>
                                            <X 
                                                className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-700" 
                                                onClick={toggleNotifications}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.slice(0, 3).map((notification) => (
                                            <div 
                                                key={notification.id}
                                                className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${notification.read ? 'opacity-70' : 'bg-blue-50'}`}
                                                onClick={() => markAsRead(notification.id)}
                                            >
                                                <div className="flex justify-between">
                                                    <h4 className="font-medium text-sm text-gray-800">{notification.title}</h4>
                                                    <span className="text-xs text-gray-500">{notification.time}</span>
                                                </div>
                                                <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                                            </div>
                                        ))}
                                    </div>
                                    
                                    <div className="p-2 text-center border-t">
                                        <button 
                                            className="text-sm text-blue-600 hover:text-blue-800"
                                            onClick={openAllNotifications}
                                        >
                                            View all notifications
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        
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

            {/* Full Notifications Page */}
            {showAllNotifications && (
                <div className="fixed inset-0 bg-white z-50 overflow-auto">
                    <div className="max-w-4xl mx-auto px-4 py-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={closeAllNotifications}
                                    className="p-2 rounded-full hover:bg-gray-100"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <h1 className="text-2xl font-bold">All Notifications</h1>
                            </div>
                            <button 
                                onClick={markAllAsRead}
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                            >
                                <Check className="w-4 h-4" />
                                Mark all as read
                            </button>
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-lg font-semibold">Unread</h2>
                                <span className="text-sm text-gray-500">{unreadCount} notifications</span>
                            </div>
                            {unreadCount > 0 ? (
                                <div className="space-y-2">
                                    {notifications.filter(n => !n.read).map((notification) => (
                                        <div 
                                            key={notification.id}
                                            className="p-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 cursor-pointer"
                                            onClick={() => markAsRead(notification.id)}
                                        >
                                            <div className="flex justify-between">
                                                <h3 className="font-medium text-gray-800">{notification.title}</h3>
                                                <span className="text-xs text-gray-500">{notification.time}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-lg">No unread notifications</p>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-lg font-semibold">Earlier</h2>
                                <span className="text-sm text-gray-500">{notifications.filter(n => n.read).length} notifications</span>
                            </div>
                            <div className="space-y-2">
                                {notifications.filter(n => n.read).map((notification) => (
                                    <div 
                                        key={notification.id}
                                        className="p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
                                    >
                                        <div className="flex justify-between">
                                            <h3 className="font-medium text-gray-800">{notification.title}</h3>
                                            <span className="text-xs text-gray-500">{notification.time}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
