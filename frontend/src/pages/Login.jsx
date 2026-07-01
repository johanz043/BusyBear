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



        }
        catch(error){


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





                <h1>

                    🐻 BusyBear

                </h1>




                <p>

                    Login to manage your tasks

                </p>





                {
                    error && (

                        <div className="error-message">

                            {error}

                        </div>

                    )
                }







                <form onSubmit={handleSubmit}>





                    <input


                        type="text"


                        placeholder="Username or Email"


                        value={username}


                        onChange={
                            (e) =>
                            setUsername(
                                e.target.value
                            )
                        }


                        required


                    />







                    <input


                        type="password"


                        placeholder="Password"


                        value={password}


                        onChange={
                            (e) =>
                            setPassword(
                                e.target.value
                            )
                        }


                        required


                    />









                    <button

                        type="submit"

                        className="login-btn"

                    >

                        Login


                    </button>







                </form>






            </div>




        </div>


    );

}



export default Login;