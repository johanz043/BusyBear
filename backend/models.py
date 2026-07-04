# Defines the data structure of your entire BusyBear backend

# Used to generate timestamps for records (e.g. account created, task updated time)
from datetime import datetime

# Import the shared database instance created in extensions.py
from extensions import db


# =========================
# USER MODEL (users table)
# =========================

class User(db.Model):
    """
    Represents a user in the system.
    Each user can have multiple tasks.
    """

    # Name of the database table
    __tablename__ = "users"

    # Unique ID for each user (primary key)
    id = db.Column(db.Integer, primary_key=True)

    # Username must be unique and cannot be empty
    username = db.Column(db.String(80), unique=True, nullable=False)

    # Email must be unique and cannot be empty
    email = db.Column(db.String(120), unique=True, nullable=False)

    # Hashed password stored securely (not plain text)
    password_hash = db.Column(db.String(255), nullable=False)

    # Timestamp when user was created
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship: one user can have many tasks
    # "Task" refers to the Task model below
    tasks = db.relationship(
        "Task",
        backref="user",  # Allows task.user to access its user
        lazy=True,       # Loads tasks only when needed
        cascade="all, delete-orphan"  # Deletes tasks if user is deleted
    )


# =========================
# TASK MODEL (tasks table)
# =========================

class Task(db.Model):
    """
    Represents a task created by a user.
    Each task belongs to one user.
    """

    # Name of the database table
    __tablename__ = "tasks"

    # Unique ID for each task (primary key)
    id = db.Column(db.Integer, primary_key=True)

    # Task title (required field)
    title = db.Column(db.String(200), nullable=False)

    # Optional detailed description of the task
    description = db.Column(db.Text)

    # Status of the task (e.g. To Do, In Progress, Done)
    status = db.Column(db.String(50), default="To Do")

    # Priority level (e.g. Low, Medium, High)
    priority = db.Column(db.String(50), default="Medium")

    # Whether the task is completed or not
    completed = db.Column(db.Boolean, default=False)

    # Deadline for the task (optional)
    due_date = db.Column(db.DateTime)

    # When the task was created
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Automatically updates timestamp when task is modified
    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    # Foreign key linking task to a user
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )