import "./TaskCard.css";


function TaskCard({

    task,

    onDelete,

    onEdit,

    onComplete

}) {


    return (


        <div

            className={
                task.completed
                ? "task-card completed"
                : "task-card"
            }

        >




            <div className="task-top">


                <h3>

                    {task.title}

                </h3>




                <span

                    className={
                        `priority-badge ${task.priority.toLowerCase()}`
                    }

                >

                    {task.priority}

                </span>



            </div>







            <p className="task-description">


                {

                task.description ||

                "No description provided"

                }


            </p>







            <div className="task-footer">



                <small>


                    {

                    task.completed

                    ? "Completed ✓"

                    : "Active task"

                    }


                </small>






                <div className="task-actions">





                    <button


                        className="edit-btn"


                        onClick={() =>
                            onEdit(task)
                        }


                    >

                        Edit


                    </button>







                    <button


                        className={

                            task.completed

                            ? "complete-btn undo"

                            : "complete-btn"

                        }



                        onClick={() =>
                            onComplete(task.id)
                        }


                    >


                        {

                        task.completed

                        ? "↩ Undo"

                        : "✓ Complete"

                        }


                    </button>







                    <button


                        className="delete-btn"


                        onClick={() =>
                            onDelete(task.id)
                        }


                    >


                        Delete


                    </button>





                </div>





            </div>





        </div>


    );

}



export default TaskCard;