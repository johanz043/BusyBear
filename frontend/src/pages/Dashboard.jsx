import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    // Load tasks when the page opens
    useEffect(() => {
        fetchTasks();
    }, []);

    // ==========================
    // Fetch Tasks
    // ==========================
    const fetchTasks = async () => {
        try {
            const response = await api.get("/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);

            // Token may be invalid or expired
            localStorage.removeItem("token");
            navigate("/login");
        }
    };

    // ==========================
    // Create Task
    // ==========================
    const createTask = async () => {
        if (!title.trim()) {
            alert("Please enter a task title.");
            return;
        }

        try {
            await api.post("/tasks", {
                title,
                description,
            });

            setTitle("");
            setDescription("");

            fetchTasks();
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    // ==========================
    // Delete Task
    // ==========================
    const deleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // ==========================
    // Update Task
    // ==========================
    const updateTask = async (task) => {
        const newTitle = prompt("Edit title:", task.title);

        if (newTitle === null) return;

        const newDescription = prompt(
            "Edit description:",
            task.description
        );

        if (newDescription === null) return;

        try {
            await api.put(`/tasks/${task.id}`, {
                title: newTitle,
                description: newDescription,
            });

            fetchTasks();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    // ==========================
    // Logout
    // ==========================
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>🐻 BusyBear Dashboard</h1>

            <button onClick={logout}>Logout</button>

            <hr />

            <h2>Create New Task</h2>

            <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br />
            <br />

            <textarea
                placeholder="Task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <br />
            <br />

            <button onClick={createTask}>
                Create Task
            </button>

            <hr />

            <h2>Your Tasks</h2>

            {tasks.length === 0 ? (
                <p>No tasks yet.</p>
            ) : (
                tasks.map((task) => (
                    <div
                        key={task.id}
                        style={{
                            border: "1px solid gray",
                            borderRadius: "8px",
                            padding: "15px",
                            marginBottom: "15px",
                        }}
                    >
                        <h3>{task.title}</h3>

                        <p>{task.description}</p>

                        <button
                            onClick={() => updateTask(task)}
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => deleteTask(task.id)}
                            style={{ marginLeft: "10px" }}
                        >
                            Delete
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default Dashboard;