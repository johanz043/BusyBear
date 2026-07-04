# 📄 BusyBear — How the Website Works

Hi! I've created this markdown file to explain how my website works!

When the website link is clicked, **index.html** creates a basic HTML “container” (`<div id="root">`) in which React will load into and control. **main.jsx** is then run, which attaches React to the HTML page, enables routing through the browser using React Router, and loads the main application through **App.jsx**.

**App.jsx** handles all frontend routing, with the **/login** page as the default. It determines which page to display based on the URL.

---

## 🧭 Registration Flow

If the user chooses to create a new account, **App.jsx** routes the user to the **/register** page, which is handled by **Register.jsx** (frontend) and **routes.py** (backend).

When the user enters a username, password, and email:

- **Register.jsx** collects the input data  
- **api.js** is called, which sends an HTTP request (using Axios) to the backend API  
- The backend (**routes.py**) receives the request, hashes the password, and stores the user data in the Supabase database  

---

## 🔐 Login Flow

Once the user has registered, they are redirected to the **/login** page, handled by **Login.jsx** (frontend) and **routes.py** (backend).

When the user enters their username and password:

- **api.js** sends an HTTP request to the backend  
- The backend verifies if the user exists and checks the password  
- If valid, the backend generates a **JWT token (authentication token)** and sends it back to the frontend  
- The frontend stores this token in **localStorage**  

---

## 🔒 Protected Routes

If login is successful, the user is redirected to the **/dashboard** page.

Before the dashboard is shown, the request passes through **ProtectedRoute.jsx**, which checks whether a valid JWT token exists in localStorage.

- If a token exists → access is granted  
- If no token exists → the user is redirected back to **/login**

---

## 📊 Dashboard & Task Flow

Once logged in, **Dashboard.jsx** loads and retrieves the user’s tasks.

- It calls **taskService.js**, which manages all task-related logic  
- **taskService.js** uses **api.js** to send requests to the backend  
- The backend (**routes.py**) processes these requests and interacts with Supabase  
- Supabase stores and returns the task data  

Users can:
- Create tasks  
- View tasks  
- Update tasks  
- Delete tasks  

All task operations follow a full CRUD (Create, Read, Update, Delete) cycle through the backend API.

---

## 🌐 API Layer (api.js)

**api.js** is an Axios-based HTTP client that acts as the communication layer between the frontend and backend.

It:
- Sets the backend base URL  
- Sends HTTP requests to Flask API endpoints  
- Automatically attaches the JWT token (if the user is logged in) to every request  

This ensures secure communication between the frontend and backend.

---

## 🧠 System Overview

React (Frontend) → Axios (api.js) → Flask Backend (REST API) → Supabase Database
