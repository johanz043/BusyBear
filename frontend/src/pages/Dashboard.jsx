import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";

import "./Dashboard.css";



function Dashboard(){


    const navigate = useNavigate();



    const [tasks,setTasks] = useState([]);

    const [modalOpen,setModalOpen] = useState(false);

    const [editingTask,setEditingTask] = useState(null);






    const fetchTasks = async()=>{


        try{


            const response =
                await api.get("/tasks");


            setTasks(
                response.data
            );


        }
        catch(error){


            console.error(
                "Error fetching tasks:",
                error.response?.data || error
            );


        }


    };







    useEffect(()=>{


        fetchTasks();


    },[]);








    const handleLogout = ()=>{


        localStorage.removeItem("token");


        navigate("/");


    };








    const handleDeleteTask = async(id)=>{


        try{


            await api.delete(
                `/tasks/${id}`
            );



            fetchTasks();



        }
        catch(error){


            console.error(error);


        }


    };







    const handleCreateTask = ()=>{


        setEditingTask(null);


        setModalOpen(true);


    };








    const handleEditTask = (task)=>{


        setEditingTask(task);


        setModalOpen(true);


    };









    const saveTask = async(data)=>{


        try{


            if(editingTask){



                await api.put(

                    `/tasks/${editingTask.id}`,

                    data

                );



            }
            else{



                await api.post(

                    "/tasks",

                    data

                );



            }




            setModalOpen(false);


            setEditingTask(null);


            fetchTasks();



        }
        catch(error){


            console.error(

                "Saving task failed:",

                error.response?.data || error

            );


        }



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



                {

                tasks.length === 0 ?


                (

                    <div className="empty-state">

                        <h2>
                            🐻
                        </h2>

                        <p>
                            No tasks yet.
                        </p>

                    </div>

                )


                :


                (

                    tasks.map(task => (


                        <TaskCard

                            key={task.id}

                            task={task}

                            onDelete={handleDeleteTask}

                            onEdit={handleEditTask}

                        />


                    ))

                )


                }



            </div>







            <TaskModal


                isOpen={modalOpen}


                closeModal={() =>
                    setModalOpen(false)
                }


                saveTask={saveTask}


                editingTask={editingTask}



            />






        </div>


    );


}



export default Dashboard;