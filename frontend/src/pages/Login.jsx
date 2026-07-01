import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPaw } from "react-icons/fa6";

import api from "../services/api";

import "./Login.css";


function Login() {


    const navigate = useNavigate();


    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);



    const handleSubmit = async (e) => {

        e.preventDefault();


        setError("");

        setLoading(true);


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
                response.data.token
            );


            navigate("/dashboard");


        } catch (err) {


            setError(
                "Invalid username/email or password"
            );


        }


        setLoading(false);

    };



    return (

        <div className="login-page">


            <div className="login-card">


                <div className="login-logo">


                    <h1>

                        🐻

                    </h1>


                    <h2>

                        BusyBear

                    </h2>


                    <p>

                        Stay organized.
                        Stay productive.

                    </p>


                </div>



                <form onSubmit={handleSubmit}>


                    <div className="login-group">


                        <label>

                            Username or Email

                        </label>


                        <input

                            type="text"

                            value={username}

                            onChange={(e) =>
                                setUsername(e.target.value)
                            }

                            placeholder="Enter username or email"

                            required

                        />


                    </div>



                    <div className="login-group">


                        <label>

                            Password

                        </label>


                        <input

                            type="password"

                            value={password}

                            onChange={(e) =>
                                setPassword(e.target.value)
                            }

                            placeholder="Enter password"

                            required

                        />


                    </div>




                    <button

                        className="login-btn"

                        disabled={loading}

                        type="submit"

                    >

                        {loading
                            ? "Signing in..."
                            : "Sign In"
                        }


                    </button>



                </form>



                {
                    error && (

                        <p className="error-message">

                            {error}

                        </p>

                    )
                }



                <div className="login-footer">


                    Don't have an account?


                    <br/>


                    <a href="/register">

                        Create an account

                    </a>


                </div>



            </div>


        </div>


    );

}


export default Login;