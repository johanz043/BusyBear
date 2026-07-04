# BusyBear
BusyBear is a **full-stack** task management web application that allows users to securely create accounts, log in, and manage personal tasks through a responsive dashboard.

BusyBear is built using **React** for the frontend, providing a modern component-based user interface with routing powered by React Router. The backend is developed using **Flask**, handling authentication and all task-related operations, including creating, reading, updating, and deleting tasks (CRUD). User data and task storage are managed using **Supabase**, which provides a PostgreSQL-based database backend.

The application implements **JWT-based authentication**, where users receive a secure token upon login. This token is stored in the browser and automatically attached to API requests using an **Axios-based** service layer (api.js), ensuring secure communication between the frontend and backend. Route protection is handled using a custom ProtectedRoute component, which restricts access to authenticated users only.

BusyBear is deployed using **Vercel** for the frontend and **Render** for the backend, allowing the system to run as a fully separated but connected full-stack architecture in production.
