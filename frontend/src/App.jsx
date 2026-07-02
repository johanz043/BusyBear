import {
  Routes,
  Route
} from "react-router-dom";


import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";

import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";



function App() {


  return (


      <Routes>


          <Route

              path="/"

              element={<Login />}

          />



          <Route

              path="/login"

              element={<Login />}

          />




          <Route

              path="/dashboard"

              element={

                  <ProtectedRoute>

                      <Dashboard />

                  </ProtectedRoute>

              }

          />

          <Route

            path="/register"

            element={<Register />}

          />


      </Routes>


  );

}


export default App;