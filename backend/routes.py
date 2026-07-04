# Creates functions

# Flask tools for handling API requests and responses
from flask import Blueprint, request, jsonify

# Database instance
from extensions import db

# Database models
from models import User, Task

# Password hashing utilities (security for user passwords)
from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

# JWT authentication tools
from flask_jwt_extended import (
    create_access_token,   # creates login token
    jwt_required,          # protects routes
    get_jwt_identity       # gets current logged-in user
)


# Create a Blueprint to group all routes in this file
routes = Blueprint(
    "routes",
    __name__
)


# =========================
# CREATE USER (REGISTER)
# =========================

@routes.route("/users", methods=["POST"])
def create_user():

    # Get JSON data from frontend request
    data = request.get_json()

    # Hash the user's password before storing it
    hashed_password = generate_password_hash(
        data["password"]
    )

    # Create a new user object
    user = User(
        username=data["username"],
        email=data["email"],
        password_hash=hashed_password
    )

    # Add user to database session
    db.session.add(user)

    # Save changes to database
    db.session.commit()

    # Return success response with user ID
    return jsonify({
        "message": "User created",
        "id": user.id
    })


# =========================
# LOGIN USER
# =========================

@routes.route("/login", methods=["POST"])
def login():

    # Get login data from request
    data = request.get_json()

    # Allow login using either username or email
    identifier = (
        data.get("username")
        or
        data.get("email")
    )

    password = data.get("password")

    # Validate input
    if not identifier or not password:
        return jsonify({
            "message": "Username/email and password are required."
        }), 400

    # Find user by username OR email
    user = User.query.filter(
        (User.username == identifier)
        |
        (User.email == identifier)
    ).first()

    # If user doesn't exist
    if not user:
        return jsonify({
            "message": "User not found."
        }), 401

    # Check if password matches stored hash
    if not check_password_hash(
        user.password_hash,
        password
    ):
        return jsonify({
            "message": "Invalid password."
        }), 401

    # Create JWT token for authentication
    access_token = create_access_token(
        identity=str(user.id)
    )

    # Return token + user info
    return jsonify({
        "access_token": access_token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }), 200


# =========================
# GET TASKS (USER ONLY)
# =========================

@routes.route("/tasks", methods=["GET"])
@jwt_required()
def get_tasks():

    # Get current user ID from JWT token
    user_id = int(get_jwt_identity())

    # Fetch only tasks belonging to this user
    tasks = Task.query.filter_by(
        user_id=user_id
    ).all()

    # Convert tasks into JSON format
    return jsonify([
        {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "status": task.status,
            "priority": task.priority,
            "completed": task.completed
        }
        for task in tasks
    ])


# =========================
# CREATE TASK
# =========================

@routes.route("/tasks", methods=["POST"])
@jwt_required()
def create_task():

    # Get user ID from JWT token
    user_id = int(get_jwt_identity())

    # Get task data from frontend
    data = request.get_json()

    # Validate required field
    if not data.get("title"):
        return jsonify({
            "message": "Title is required"
        }), 400

    # Create new task
    task = Task(
        title=data["title"],
        description=data.get("description"),
        priority=data.get("priority", "Medium"),
        completed=False,
        user_id=user_id
    )

    # Save to database
    db.session.add(task)
    db.session.commit()

    return jsonify({
        "message": "Task created",
        "id": task.id
    }), 201


# =========================
# UPDATE TASK
# =========================

@routes.route("/tasks/<int:id>", methods=["PUT"])
@jwt_required()
def update_task(id):

    # Get current user ID
    user_id = int(get_jwt_identity())

    # Find task that belongs to this user
    task = Task.query.filter_by(
        id=id,
        user_id=user_id
    ).first_or_404()

    # Get update data
    data = request.get_json()

    # Update fields if provided, otherwise keep old values
    task.title = data.get("title", task.title)
    task.description = data.get("description", task.description)
    task.status = data.get("status", task.status)
    task.priority = data.get("priority", task.priority)

    # Update completion state
    task.completed = data.get("completed", task.completed)

    # Save changes
    db.session.commit()

    return jsonify({
        "message": "Task updated"
    })


# =========================
# TOGGLE TASK COMPLETION
# =========================

@routes.route("/tasks/<int:id>/complete", methods=["PATCH"])
@jwt_required()
def complete_task(id):

    user_id = int(get_jwt_identity())

    # Find user's task
    task = Task.query.filter_by(
        id=id,
        user_id=user_id
    ).first_or_404()

    # Flip completion status (true → false, false → true)
    task.completed = not task.completed

    db.session.commit()

    return jsonify({
        "message": "Task completion updated",
        "completed": task.completed
    })


# =========================
# DELETE TASK
# =========================

@routes.route("/tasks/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_task(id):

    user_id = int(get_jwt_identity())

    # Find task belonging to user
    task = Task.query.filter_by(
        id=id,
        user_id=user_id
    ).first_or_404()

    # Delete from database
    db.session.delete(task)
    db.session.commit()

    return jsonify({
        "message": "Task deleted"
    })