import "./TaskCard.css";


function TaskCard({
    task,
    onDelete,
    onEdit
}) {


    return (

        <div className="task-card">


            <div className="task-content">


                <h3>
                    {task.title}
                </h3>


                <p>
                    {task.description}
                </p>


            </div>



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

                    className="delete-btn"

                    onClick={() =>
                        onDelete(task.id)
                    }

                >

                    Delete

                </button>



            </div>



        </div>

    );

}


export default TaskCard;