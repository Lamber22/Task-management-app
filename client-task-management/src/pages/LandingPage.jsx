import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => navigate('/login');
    const handleRegister = () => navigate('/register');

    return (
        <div>
        {/* Header */}
        <header className="bg-blue-600 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl lg:text-3xl font-bold ml-5">Task Manager</h1>
            <div>
                <button
                className="bg-white text-blue-600 py-2 px-4 rounded mr-2"
                onClick={handleLogin}
                >
                Login
                </button>
                <button
                className="bg-white text-blue-600 py-2 px-4 rounded mr-2"
                onClick={handleRegister}
                >
                Register
                </button>
            </div>
            </div>
        </header>

        {/* Hero Section */}
        <section className="bg-gray-100 py-20">
            <div className="container mx-auto px-7 text-center">
            <h2 className="text-2xl lg:text-5xl font-bold mb-4">Organize Your Tasks Efficiently</h2>
            <p className="text-lg mb-8">
                A simple and intuitive task management tool to help you stay organized and productive.
            </p>
            <div>
                <button
                className="bg-blue-600 text-white py-3 px-6 rounded-lg mr-4"
                onClick={handleRegister}
                >
                Get Started
                </button>
                <button
                className="bg-transparent border border-blue-600 text-blue-600 py-3 px-6 rounded-lg"
                onClick={handleLogin}
                >
                Login
                </button>
            </div>
            </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
            <div className="container mx-auto">
            <h3 className="text-3xl font-bold text-center mb-10">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-2">Task Categorization</h4>
                <p className="text-gray-600">Organize your tasks into categories like Work, Personal, or Urgent for better management.</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-2">Task Status Management</h4>
                <p className="text-gray-600">Track the status of tasks with options like To Do, In Progress, and Completed.</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-2">Search & Filter</h4>
                <p className="text-gray-600">Easily search and filter tasks based on title, category, or due date.</p>
                </div>
            </div>
            </div>
        </section>

        {/* Footer */}
        <footer className="bg-blue-600 text-white py-6">
            <div className="container mx-auto text-center">
            <p>&copy; 2024 Task Manager. All rights reserved.</p>
            </div>
        </footer>
        </div>
    );
};

export default LandingPage;
