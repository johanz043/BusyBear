# BusyBear
BusyBear is a full-stack task management web application built using **React** (frontend), **Flask** (backend), and **Supabase** (database). It allows users to register, log in securely, and manage personal tasks through a simple and responsive dashboard.
Users can:

- Create tasks
- View tasks
- Update tasks
- Delete tasks

All task operations are handled through a service layer in the frontend, which communicates with the Flask backend, which then interacts with Supabase.

BusyBear is hosted through Vercel and Render



# QuickMeals
QuickMeals is an **AI-powered** web application that detects ingredients from an image of your fridge or food items and generates possible recipes based on what you have!

QuickMeals is a full-stack project that combines **Flask** and **Python** for the backend, enabling a lightweight web application structure. It uses **Hugging Face Transformers** and **PyTorch** for AI-powered food image recognition, allowing the system to detect ingredients from uploaded images. The application integrates **TheMealDB API** to retrieve and generate recipe recommendations based on the detected ingredients, while **HTML**, **CSS**, and **JavaScript** are used to create a clean and interactive user interface for a smooth user experience.


Due to heavy AI dependencies (PyTorch + Transformers), this application cannot be reliably deployed on free hosting platforms such as Vercel or Render.
To use QuickMeals, you must run it locally on your machine.

Before running the app, you must install:
- Python 3.9+
- pip
- virtualenv
