#Creates and configures the Flask backend server and connects all the pieces together so the app can run

from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

# Import the SQLAlchemy database instance
from extensions import db

# Import JWT support for user authentication
from flask_jwt_extended import JWTManager


# Load environment variables from the .env file
load_dotenv()


# Create the Flask application
app = Flask(__name__)


# ======================
# JWT CONFIGURATION
# ======================

# Secret key used to sign and verify JWT access tokens
app.config["JWT_SECRET_KEY"] = "busy-bear-secret-key"

# Initialise JWT for the Flask application
jwt = JWTManager(app)



# ======================
# APPLICATION CONFIGURATION
# ======================

# Allow requests from the frontend application
CORS(app)

# Configure the database connection using the DATABASE_URL
# stored in the environment variables
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")

# Disable modification tracking to improve performance
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False



# ======================
# DATABASE INITIALISATION
# ======================

# Connect the SQLAlchemy database instance to this Flask app
db.init_app(app)



# ======================
# REGISTER APPLICATION ROUTES
# ======================

# Import the application's API blueprint
from routes import routes

# Register all routes defined in routes.py
app.register_blueprint(routes)



# ======================
# CREATE DATABASE TABLES
# ======================

# Create the database tables if they do not already exist
with app.app_context():

    # Import models so SQLAlchemy knows which tables to create
    from models import User, Task

    db.create_all()



# ======================
# HOME ROUTE
# ======================

# Simple route used to verify that the backend server is running
@app.route("/")
def home():

    return {
        "message": "BusyBear API is running 🐻"
    }



# ======================
# START APPLICATION
# ======================

# Run the Flask development server
if __name__ == "__main__":

    # app.run(debug=True)

    # Run the server on all available network interfaces
    # using port 5000 with debug mode enabled
    app.run(host="0.0.0.0", port=5000, debug=True)