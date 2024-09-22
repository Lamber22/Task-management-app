import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]); // State to hold all tasks
    const [newTask, setNewTask] = useState({ // State for the new task's data
        title: '',
        description: '',
        dueDate: '',
        category: '',
        status: 'To Do'
    });
    const [editingTaskId, setEditingTaskId] = useState(null); // State for the task being edited
    const [visibleTasks, setVisibleTasks] = useState({}); // State to control visibility of task details
    const [isFormVisible, setIsFormVisible] = useState(false); // State to manage the form's visibility
    const [selectedCategory, setSelectedCategory] = useState('All'); // State to filter tasks by category
    const navigate = useNavigate(); // Using navigate hook for redirection

    // Handler for input field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({ ...newTask, [name]: value }); // Update newTask state
    };

    // Handler to add or update a task
    const handleAddOrUpdateTask = () => {
        if (newTask.title && newTask.dueDate && newTask.category) { // Ensure required fields are filled
            if (editingTaskId) {
                // Update existing task
                setTasks(tasks.map(task => task.id === editingTaskId ? { ...newTask, id: editingTaskId } : task));
                setEditingTaskId(null); // Reset editing task id
            } else {
                // Add new task
                setTasks([...tasks, { ...newTask, id: Date.now() }]);
            }
            setNewTask({ title: '', description: '', dueDate: '', category: '', status: 'To Do' }); // Reset form
            setIsFormVisible(false); // Hide form
        } else {
            alert("Please fill out the title, category, and due date before adding a task."); // Alert if fields are missing
        }
    };

    // Handler to edit an existing task
    const handleEditTask = (task) => {
        setNewTask(task); // Populate form with task data
        setEditingTaskId(task.id); // Set the id of the task being edited
        setIsFormVisible(true); // Show the form
    };

    // Handler to delete a task
    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id)); // Remove task from the list
    };

    // Handler for logging out
    const handleLogout = () => {
        navigate('/'); // Navigate to home
    };

    // Toggle visibility of individual task details
    const toggleTaskVisibility = (id) => {
        setVisibleTasks(prevVisibleTasks => ({
            ...prevVisibleTasks,
            [id]: !prevVisibleTasks[id] // Toggle visibility for the specific task
        }));
    };

    // Handler for category filter change
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value); // Update selected category
    };

    // Filter tasks based on the selected category
    const filteredTasks = selectedCategory === 'All'
        ? tasks // If 'All', show all tasks
        : tasks.filter(task => task.category === selectedCategory); // Filter tasks by category

    return (
        <div>
            <header className="bg-blue-600 text-white py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold ml-4">Dashboard</h1>
                    <button className="bg-red-600 py-2 px-4 rounded mr-3" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>

            <div className="container mx-auto py-6 px-4 flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-4">Task Management</h2>
                    <div>
                        <button
                            className="bg-blue-600 text-white py-2 px-4 rounded w-full mb-4"
                            onClick={() => setIsFormVisible(!isFormVisible)} // Toggle form visibility
                        >
                            {isFormVisible ? 'Cancel' : 'Add New Task'}
                        </button>
                    </div>

                    {isFormVisible && (
                        <div>
                            <h2 className="text-2xl font-bold mb-4">{editingTaskId ? 'Edit Task' : 'Add New Task'}</h2>
                            <input
                                type="text"
                                name="title"
                                placeholder="Task Title"
                                value={newTask.title}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full mb-2"
                            />
                            <textarea
                                name="description"
                                placeholder="Task Description"
                                value={newTask.description}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full mb-2"
                                rows="3"
                            />
                            <input
                                type="date"
                                name="dueDate"
                                value={newTask.dueDate}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full mb-2"
                            />
                            <select
                                name="category"
                                value={newTask.category}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full mb-2"
                            >
                                <option value="">Select Category</option>
                                <option value="Work">Work</option>
                                <option value="Personal">Personal</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Fitness">Fitness</option>
                                <option value="Other">Other</option>
                            </select>
                            {newTask.category === 'Other' && (
                                <input
                                    type="text"
                                    name="category"
                                    placeholder="Enter custom category"
                                    value={newTask.category}
                                    onChange={handleInputChange}
                                    className="border p-2 rounded w-full mb-2"
                                />
                            )}
                            <select
                                name="status"
                                value={newTask.status}
                                onChange={handleInputChange}
                                className="border p-2 rounded w-full mb-4"
                            >
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <button className="bg-blue-600 text-white py-2 px-4 rounded w-full"
                                onClick={handleAddOrUpdateTask}>
                                {editingTaskId ? 'Update Task' : 'Add Task'}
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="border p-2 rounded mb-4"
                    >
                        <option value="All">All Categories</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Other">Other</option>
                    </select>

                    {Object.entries(filteredTasks.reduce((acc, task) => {
                        acc[task.category] = acc[task.category] || []; // Initialize category if it doesn't exist
                        acc[task.category].push(task); // Group tasks by category
                        return acc;
                    }, {})).map(([category, tasks]) => (
                        <div key={category}>
                            <h3 className="font-semibold text-xl mb-2">{category}</h3>
                            {tasks.length === 0 ? (
                                <p>No tasks in this category</p> // Message for empty category
                            ) : (
                                <div className="flex flex-col space-y-4">
                                    {tasks.map(task => (
                                        <div key={task.id} className="border p-4 rounded shadow-md bg-white">
                                            <h3 className="font-semibold text-lg">{task.title}</h3>
                                            <button
                                                className="bg-blue-500 text-white py-1 px-3 rounded mt-2"
                                                onClick={() => toggleTaskVisibility(task.id)}>
                                                {visibleTasks[task.id] ? 'Collapse' : 'View Task'}
                                            </button>
                                            {visibleTasks[task.id] && (
                                                <div className="mt-4">
                                                    <p className="text-gray-600 mb-2">{task.description}</p>
                                                    <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                                                    <p className="text-sm text-gray-500">Category: {task.category}</p>
                                                    <p className="text-sm text-gray-500">Status: {task.status}</p>
                                                    <div className="flex space-x-2 mt-2">
                                                        <button className="bg-green-500 text-white py-1 px-3 rounded"
                                                            onClick={() => handleEditTask(task)}>
                                                            Edit Task
                                                        </button>
                                                        <button className="bg-red-500 text-white py-1 px-3 rounded"
                                                            onClick={() => handleDeleteTask(task.id)}>
                                                            Delete Task
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
