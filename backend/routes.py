from flask import Blueprint, request, jsonify

from extensions import db
from models import User, Task

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)

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


    identifier = (
        data.get("username")
        or
        data.get("email")
    )


    password = data.get("password")



    if not identifier or not password:

        return jsonify({

            "message":
            "Username/email and password are required."

        }), 400





    user = User.query.filter(

        (User.username == identifier)
        |
        (User.email == identifier)

    ).first()





    if not user:

        return jsonify({

            "message":
            "User not found."

        }), 401





    if not check_password_hash(
        user.password_hash,
        password
    ):

        return jsonify({

            "message":
            "Invalid password."

        }), 401





    access_token = create_access_token(

        identity=str(user.id)

    )




    return jsonify({

        "access_token": access_token,

        "user": {

            "id": user.id,

            "username": user.username,

            "email": user.email

        }

    }), 200







# =========================
# GET TASKS
# =========================

@routes.route("/tasks", methods=["GET"])
@jwt_required()
def get_tasks():


    user_id = int(
        get_jwt_identity()
    )



    tasks = Task.query.filter_by(

        user_id=user_id

    ).all()




    return jsonify([

        {

            "id": task.id,

            "title": task.title,

            "description": task.description,

            "status": task.status,

            "priority": task.priority,

            # NEW
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


    user_id = int(
        get_jwt_identity()
    )


    data = request.get_json()



    if not data.get("title"):

        return jsonify({

            "message":
            "Title is required"

        }), 400






    task = Task(

        title=data["title"],

        description=data.get(
            "description"
        ),

        priority=data.get(
            "priority",
            "Medium"
        ),

        completed=False,

        user_id=user_id

    )





    db.session.add(task)

    db.session.commit()





    return jsonify({

        "message":
        "Task created",

        "id":
        task.id

    }), 201







# =========================
# UPDATE TASK
# =========================

@routes.route("/tasks/<int:id>", methods=["PUT"])
@jwt_required()
def update_task(id):


    user_id = int(
        get_jwt_identity()
    )



    task = Task.query.filter_by(

        id=id,

        user_id=user_id

    ).first_or_404()





    data = request.get_json()





    task.title = data.get(

        "title",

        task.title

    )


    task.description = data.get(

        "description",

        task.description

    )


    task.status = data.get(

        "status",

        task.status

    )


    task.priority = data.get(

        "priority",

        task.priority

    )


    # NEW
    task.completed = data.get(

        "completed",

        task.completed

    )





    db.session.commit()




    return jsonify({

        "message":
        "Task updated"

    })









# =========================
# COMPLETE TASK
# =========================

@routes.route(
    "/tasks/<int:id>/complete",
    methods=["PATCH"]
)
@jwt_required()
def complete_task(id):


    user_id = int(
        get_jwt_identity()
    )



    task = Task.query.filter_by(

        id=id,

        user_id=user_id

    ).first_or_404()



    task.completed = not task.completed



    db.session.commit()



    return jsonify({

        "message":
        "Task completion updated",

        "completed":
        task.completed

    })











# =========================
# DELETE TASK
# =========================

@routes.route("/tasks/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_task(id):


    user_id = int(
        get_jwt_identity()
    )



    task = Task.query.filter_by(

        id=id,

        user_id=user_id

    ).first_or_404()





    db.session.delete(task)

    db.session.commit()




    return jsonify({

        "message":
        "Task deleted"

    })