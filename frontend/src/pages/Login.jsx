import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import "./Login.css";


function Login() {


    const navigate = useNavigate();


    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");





    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");



        try {


            const response = await api.post(

                "/login",

                {
                    username,
                    password
                }

            );



            localStorage.setItem(

                "token",

                response.data.access_token

            );



            navigate("/dashboard");


        } catch (error) {


            console.error(

                "Login failed:",

                error.response?.data || error

            );


            setError(

                error.response?.data?.message ||

                "Login failed"

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

                        Login to manage your tasks

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


                        <label>

                            Username or Email

                        </label>


                        <input

                            type="text"

                            placeholder="Enter username or email"

                            value={username}

                            onChange={(e) =>
                                setUsername(e.target.value)
                            }

                            required

                        />


                    </div>





                    <div className="login-group">


                        <label>

                            Password

                        </label>


                        <input

                            type="password"

                            placeholder="Enter password"

                            value={password}

                            onChange={(e) =>
                                setPassword(e.target.value)
                            }

                            required

                        />


                    </div>





                    <button

                        type="submit"

                        className="login-btn"

                    >

                        Login

                    </button>


                </form>





                <div className="login-footer">

                    Stay productive with BusyBear 🐻

                </div>




            </div>


        </div>

    );

}


export default Login;