import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import "./Login.css";


function Register(){


    const navigate = useNavigate();


    const [username,setUsername] = useState("");

    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");

    const [error,setError] = useState("");





    const handleSubmit = async(e)=>{


        e.preventDefault();

        setError("");



        try{


            await api.post(

                "/users",

                {

                    username,

                    email,

                    password

                }

            );



            navigate("/login");



        }
        catch(error){


            console.error(

                "Register failed:",
                error

            );


            setError(

                error.response?.data?.message ||

                "Registration failed"

            );


        }


    };





    return (


        <div className="login-page">



            <div className="login-card">



                <div className="login-logo">


                    <h1>

                        🐻 BusyBear

                    </h1>


                    <p>

                        Create your account

                    </p>


                </div>






                {
                    error && (

                        <div className="error-message">

                            {error}

                        </div>

                    )
                }








                <form onSubmit={handleSubmit}>


                    <div className="login-group">


                        <input

                            type="text"

                            placeholder="Username"

                            value={username}

                            onChange={
                                e =>
                                setUsername(
                                    e.target.value
                                )
                            }

                            required

                        />


                    </div>







                    <div className="login-group">


                        <input

                            type="email"

                            placeholder="Email"

                            value={email}

                            onChange={
                                e =>
                                setEmail(
                                    e.target.value
                                )
                            }

                            required

                        />


                    </div>







                    <div className="login-group">


                        <input

                            type="password"

                            placeholder="Password"

                            value={password}

                            onChange={
                                e =>
                                setPassword(
                                    e.target.value
                                )
                            }

                            required

                        />


                    </div>







                    <button

                        type="submit"

                        className="login-btn"

                    >

                        Create Account


                    </button>



                </form>







                <div className="login-footer">


                    Already have an account?


                    <button

                        className="link-btn"

                        onClick={() =>
                            navigate("/login")
                        }

                    >

                        Login

                    </button>



                </div>




            </div>



        </div>


    );

}


export default Register;