from flask import Blueprint, request, jsonify

from extensions import db
from models import User, Task

from werkzeug.security import generate_password_hash, check_password_hash

from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)


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
# LOGIN
# =========================

@routes.route("/login", methods=["POST"])
def login():

    data = request.get_json()


    user = User.query.filter_by(
        email=data["email"]
    ).first()


    if user is None:

        return jsonify({
            "message": "User not found"
        }), 404



    if check_password_hash(
        user.password_hash,
        data["password"]
    ):

        token = create_access_token(
            identity=str(user.id)
)

        return jsonify({
            "access_token": token
        })


    return jsonify({
        "message": "Invalid password"
    }), 401




# =========================
# GET TASKS
# =========================

@routes.route("/tasks", methods=["GET"])
@jwt_required()
def get_tasks():

    user_id = get_jwt_identity()


    tasks = Task.query.filter_by(
        user_id=user_id
    ).all()


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





# =========================
# CREATE TASK
# =========================

@routes.route("/tasks", methods=["POST"])
@jwt_required()
def create_task():

    user_id = get_jwt_identity()

    data = request.get_json()


    task = Task(
        title=data["title"],
        description=data.get("description"),
        priority=data.get(
            "priority",
            "Medium"
        ),
        user_id=user_id
    )


    db.session.add(task)
    db.session.commit()


    return jsonify({
        "message": "Task created",
        "id": task.id
    })





# =========================
# UPDATE TASK
# =========================

@routes.route("/tasks/<int:id>", methods=["PUT"])
@jwt_required()
def update_task(id):

    user_id = get_jwt_identity()


    task = Task.query.filter_by(
        id=id,
        user_id=user_id
    ).first_or_404()



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
        "message": "Task updated"
    })





# =========================
# DELETE TASK
# =========================

@routes.route("/tasks/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_task(id):

    user_id = get_jwt_identity()


    task = Task.query.filter_by(
        id=id,
        user_id=user_id
    ).first_or_404()



    db.session.delete(task)
    db.session.commit()


    return jsonify({
        "message": "Task deleted"
    })