from flask import Blueprint, request, jsonify

from extensions import db
from models import User, Task

from werkzeug.security import generate_password_hash


routes = Blueprint(
    "routes",
    __name__
)


# =========================
# CREATE USER
# =========================
@routes.route("/users", methods=["POST"])
def create_user():

    data = request.get_json()

    hashed_password = generate_password_hash(
        data["password"]
    )

    user = User(
        username=data["username"],
        email=data["email"],
        password_hash=hashed_password
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "User created",
        "id": user.id
    })



# =========================
# GET TASKS
# =========================
@routes.route("/tasks", methods=["GET"])
def get_tasks():

    tasks = Task.query.all()

    output = []

    for task in tasks:

        output.append({
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "status": task.status,
            "priority": task.priority,
            "user_id": task.user_id
        })

    return jsonify(output)



# =========================
# CREATE TASK
# =========================
@routes.route("/tasks", methods=["POST"])
def create_task():

    data = request.get_json()

    task = Task(
        title=data["title"],
        description=data.get("description"),
        priority=data.get("priority", "Medium"),
        user_id=data["user_id"]
    )

    db.session.add(task)
    db.session.commit()

    return jsonify({
        "message": "Task created",
        "id": task.id
    })



# =========================
# GET SINGLE TASK
# =========================
@routes.route("/tasks/<int:id>", methods=["GET"])
def get_task(id):

    task = Task.query.get_or_404(id)

    return jsonify({
        "id": task.id,
        "title": task.title,
        "description": task.description,
        "status": task.status,
        "priority": task.priority,
        "user_id": task.user_id
    })



# =========================
# UPDATE TASK
# =========================
@routes.route("/tasks/<int:id>", methods=["PUT"])
def update_task(id):

    task = Task.query.get_or_404(id)

    data = request.get_json()


    if "title" in data:
        task.title = data["title"]

    if "description" in data:
        task.description = data["description"]

    if "status" in data:
        task.status = data["status"]

    if "priority" in data:
        task.priority = data["priority"]


    db.session.commit()


    return jsonify({
        "message": "Task updated",
        "id": task.id
    })



# =========================
# DELETE TASK
# =========================
@routes.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):

    task = Task.query.get_or_404(id)

    db.session.delete(task)
    db.session.commit()


    return jsonify({
        "message": "Task deleted",
        "id": id
    })