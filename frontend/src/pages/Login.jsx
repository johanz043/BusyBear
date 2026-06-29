import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();



    async function handleLogin(e){

        e.preventDefault();


        try {

            const response = await api.post("/login", {

                username,
                password

            });



            const token = response.data.access_token;



            localStorage.setItem(
                "token",
                token
            );


            navigate("/dashboard");


        } catch(error){


            console.log(error.response);


            alert(
                error.response?.data?.message ||
                "Login failed"
            );

        }

    }



    return (

        <div>

            <h1>
                BusyBear Login
            </h1>



            <form onSubmit={handleLogin}>


                <input

                    placeholder="Username or Email"

                    value={username}

                    onChange={
                        e => setUsername(e.target.value)
                    }

                />



                <input

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={
                        e => setPassword(e.target.value)
                    }

                />



                <button>
                    Login
                </button>


            </form>


        </div>

    );

}



export default Login;