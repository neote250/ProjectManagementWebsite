import propTypes from 'prop-types';

const AlternateLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
            <header className="w-full text-center p-4 bg-gray-800 shadow-md">
                <h1 className="text-xl font-bold">Alternate Layout</h1>
            </header>
            <main className="flex-1 w-full max-w-4xl">{children}</main>
            <footer className="w-full text-center p-4 bg-gray-800 mt-auto">
                <p>Alternate Footer</p>
            </footer>
        </div>
    );
};

AlternateLayout.propTypes = {
    children: propTypes.node.isRequired,
};

export default AlternateLayout;
