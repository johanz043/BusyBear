import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import TaskCard from "../components/TaskCard";

import "./Dashboard.css";


function Dashboard() {


    const navigate = useNavigate();


    const [tasks, setTasks] = useState([]);



    const fetchTasks = async () => {

        try {

            const response = await api.get("/tasks");

            setTasks(response.data);


        } catch (error) {

            console.error(
                "Error fetching tasks:",
                error
            );

        }

    };



    useEffect(() => {

        fetchTasks();

    }, []);




    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };



    const handleDeleteTask = async (id) => {

        try {

            await api.delete(`/tasks/${id}`);

            setTasks(
                tasks.filter(
                    task => task.id !== id
                )
            );


        } catch(error){

            console.error(
                "Delete failed:",
                error
            );

        }

    };




    const handleEditTask = (task) => {

        console.log(
            "Edit task:",
            task
        );

        // We'll replace this with a modal later

    };




    const handleCreateTask = () => {

        console.log(
            "Create task"
        );

        // We'll add modal later

    };




    return (

        <div className="dashboard-page">



            <div className="dashboard-top">


                <div className="brand">


                    <h1>
                        🐻 BusyBear
                    </h1>


                    <p>
                        Welcome back 👋
                    </p>


                </div>




                <button

                    className="logout-btn"

                    onClick={handleLogout}

                >

                    Logout

                </button>



            </div>





            <div className="stats">



                <div className="stat-card">

                    <h3>
                        Total Tasks
                    </h3>


                    <h1>
                        {tasks.length}
                    </h1>

                </div>





                <div className="stat-card">

                    <h3>
                        Completed
                    </h3>


                    <h1>
                        0
                    </h1>


                </div>






                <div className="stat-card">

                    <h3>
                        Remaining
                    </h3>


                    <h1>
                        {tasks.length}
                    </h1>


                </div>



            </div>







            <div className="tasks-header">


                <h2>
                    Your Tasks
                </h2>




                <button

                    className="new-task-btn"

                    onClick={handleCreateTask}

                >

                    + New Task


                </button>



            </div>







            <div className="tasks-grid">



                {tasks.length === 0 ? (


                    <p>
                        No tasks yet 🐻
                    </p>


                ) : (


                    tasks.map(task => (


                        <TaskCard

                            key={task.id}

                            task={task}

                            onDelete={handleDeleteTask}

                            onEdit={handleEditTask}

                        />


                    ))


                )}



            </div>





        </div>

    );


}



export default Dashboard;