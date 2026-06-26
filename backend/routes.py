from flask import Blueprint, request, jsonify

from extensions import db
from models import User, Task

routes = Blueprint(
    "routes",
    __name__
)


@routes.route("/users", methods=["POST"])
def create_user():

    data = request.get_json()

    user = User(
        username=data["username"],
        email=data["email"],
        password=data["password"]
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "User created",
        "id": user.id
    })


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
            "priority": task.priority
        })

    return jsonify(output)


@routes.route("/tasks", methods=["POST"])
def create_task():

    data = request.get_json()

    task = Task(
        title=data["title"],
        description=data.get("description"),
        priority=data.get("priority", "Medium")
    )

    db.session.add(task)
    db.session.commit()

    return jsonify({
        "message": "Task created",
        "id": task.id
    })