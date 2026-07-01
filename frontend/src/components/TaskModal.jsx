import { useEffect, useState } from "react";

import "./TaskModal.css";


function TaskModal({
    isOpen,
    closeModal,
    saveTask,
    editingTask
}) {


    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [priority, setPriority] = useState("Medium");



    useEffect(() => {


        if(editingTask){


            setTitle(
                editingTask.title
            );


            setDescription(
                editingTask.description || ""
            );


            setPriority(
                editingTask.priority || "Medium"
            );


        }
        else{


            setTitle("");

            setDescription("");

            setPriority("Medium");


        }


    }, [editingTask]);





    if(!isOpen){

        return null;

    }






    const handleSubmit = (e) => {


        e.preventDefault();



        saveTask({

            title,

            description,

            priority

        });


    };






    return (

        <div className="modal-overlay">


            <div className="task-modal">



                <h2>

                    {editingTask
                        ? "Edit Task"
                        : "Create Task"
                    }

                </h2>





                <form onSubmit={handleSubmit}>


                    <label>
                        Title
                    </label>


                    <input

                        value={title}

                        onChange={
                            e =>
                            setTitle(
                                e.target.value
                            )
                        }

                        placeholder="Task title"

                        required

                    />





                    <label>

                        Description

                    </label>



                    <textarea

                        value={description}

                        onChange={
                            e =>
                            setDescription(
                                e.target.value
                            )
                        }

                        placeholder="Describe your task"

                    />






                    <label>

                        Priority

                    </label>



                    <select

                        value={priority}

                        onChange={
                            e =>
                            setPriority(
                                e.target.value
                            )
                        }

                    >

                        <option>
                            Low
                        </option>


                        <option>
                            Medium
                        </option>


                        <option>
                            High
                        </option>


                    </select>






                    <div className="modal-actions">


                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={closeModal}

                        >

                            Cancel

                        </button>





                        <button

                            type="submit"

                            className="save-btn"

                        >

                            Save

                        </button>



                    </div>




                </form>




            </div>



        </div>

    );


}



export default TaskModal;