import { Bell, User } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-white p-4 shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-xl text-yellow-800 font-bold">ProjectHub</div>
                <div className="flex items-center gap-4">
                    <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
                    <User className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
                </div>
            </div>
        </header>
    );
};

export default Header;