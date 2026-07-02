import "./TaskCard.css";

function TaskCard({
    task,
    onDelete,
    onEdit
}) {

    return (

        <div className="task-card">


            <div className="task-top">


                <h3>

                    {task.title}

                </h3>


                <span
                    className={`priority-badge ${task.priority.toLowerCase()}`}
                >

                    {task.priority}

                </span>


            </div>




            <p className="task-description">

                {task.description ||
                    "No description provided"}

            </p>





            <div className="task-footer">


                <small>

                    Created recently

                </small>



                <div>


                    <button

                        className="edit-btn"

                        onClick={() =>
                            onEdit(task)
                        }

                    >

                        Edit

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