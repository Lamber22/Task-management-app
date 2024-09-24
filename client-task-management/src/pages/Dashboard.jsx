import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, createTask, updateTask, deleteTask } from '../slices/taskSlice'; // Import all task actions
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');

    // Redirect to login if no token is found
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token, navigate]);

    // Access tasks from Redux store
    const { tasks = [], status, error } = useSelector((state) => state.tasks); // Ensure tasks is an array
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        category: '',
        status: 'To Do'
    });
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [visibleTasks, setVisibleTasks] = useState({});
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Fetch tasks on component mount
    useEffect(() => {
        if (token) {
            dispatch(fetchTasks({ token })); // Assuming fetchTasks accepts token for authentication
        }
    }, [dispatch, token]);

    // Handle adding a new task
    const handleAddTask = () => {
        if (newTask.title && newTask.dueDate && newTask.category) {
            dispatch(createTask({ ...newTask, token }));
            setNewTask({ title: '', description: '', dueDate: '', category: '', status: 'To Do' });
            setIsFormVisible(false);
        } else {
            alert('Please fill out the title, category, and due date before adding a task.');
        }
    };

    // Handle updating a task
    const handleUpdateTask = () => {
        if (editingTaskId) {
            dispatch(updateTask({ ...newTask, _id: editingTaskId, token }));
            setNewTask({ title: '', description: '', dueDate: '', category: '', status: 'To Do' });
            setEditingTaskId(null);
            setIsFormVisible(false);
        }
    };

    // Handle deleting a task
    const handleDeleteTask = (taskId) => {
        dispatch(deleteTask({ taskId, token }));
    };

    // Handler for form submission (Add/Update task)
    const handleAddOrUpdateTask = () => {
        if (editingTaskId) {
            handleUpdateTask();
        } else {
            handleAddTask();
        }
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    // Toggle visibility of task details
    const toggleTaskVisibility = (id) => {
        setVisibleTasks((prevVisibleTasks) => ({
            ...prevVisibleTasks,
            [id]: !prevVisibleTasks[id],
        }));
    };

    // Filter tasks based on category
    const filteredTasks = selectedCategory === 'All'
        ? tasks
        : tasks.filter((task) => task.category === selectedCategory);

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
                {/* Add/Update Task Form */}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-4">Task Management</h2>
                    <button
                        className="bg-blue-600 text-white py-2 px-4 rounded w-full mb-4"
                        onClick={() => setIsFormVisible(!isFormVisible)}
                    >
                        {isFormVisible ? 'Cancel' : 'Add New Task'}
                    </button>

                    {isFormVisible && (
                        <div>
                            {/* Task Title */}
                            <input
                                type="text"
                                name="title"
                                placeholder="Task Title"
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                className="border p-2 rounded w-full mb-2"
                            />

                            {/* Task Description */}
                            <textarea
                                name="description"
                                placeholder="Task Description"
                                value={newTask.description}
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                className="border p-2 rounded w-full mb-2"
                            />

                            {/* Due Date */}
                            <input
                                type="date"
                                name="dueDate"
                                value={newTask.dueDate}
                                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                className="border p-2 rounded w-full mb-2"
                            />

                            {/* Task Category */}
                            <select
                                name="category"
                                value={newTask.category}
                                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                                className="border p-2 rounded w-full mb-2"
                            >
                                <option value="">Select Category</option>
                                <option value="Work">Work</option>
                                <option value="Personal">Personal</option>
                                <option value="Others">Others</option>
                            </select>

                            {/* Task Status */}
                            <select
                                name="status"
                                value={newTask.status}
                                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                                className="border p-2 rounded w-full mb-2"
                            >
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>

                            {/* Submit Button */}
                            <button
                                className="bg-blue-600 text-white py-2 px-4 rounded w-full"
                                onClick={handleAddOrUpdateTask}
                            >
                                {editingTaskId ? 'Update Task' : 'Add Task'}
                            </button>
                        </div>
                    )}
                </div>

                {/* Task List */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
                    {status === 'loading' && <p>Loading tasks...</p>}
                    {status === 'failed' && <p>Error: {error}</p>}
                    {tasks.length === 0 && <p>No tasks available.</p>}
                    {tasks.length > 0 && (
                        filteredTasks.map((task) => (
                            <div key={task._id} className="border rounded p-4 mb-4">
                                <h3 className="text-xl font-bold">
                                    {task.title}
                                    <button
                                        className="ml-2 text-sm text-red-600"
                                        onClick={() => handleDeleteTask(task._id)}
                                    >
                                        Delete
                                    </button>
                                </h3>
                                {/* Task Details */}
                                <div>
                                    {visibleTasks[task._id] ? (
                                        <div>
                                            <p>{task.description}</p>
                                            <button onClick={() => toggleTaskVisibility(task._id)}>Hide</button>
                                        </div>
                                    ) : (
                                        <button onClick={() => toggleTaskVisibility(task._id)}>Show Details</button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
