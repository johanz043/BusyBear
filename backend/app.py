from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

from extensions import db

from flask_jwt_extended import JWTManager


load_dotenv()


app = Flask(__name__)


# ======================
# JWT CONFIG
# ======================

app.config["JWT_SECRET_KEY"] = "busy-bear-secret-key"

jwt = JWTManager(app)



# ======================
# OTHER CONFIG
# ======================

CORS(app)


app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False



# ======================
# DATABASE
# ======================

db.init_app(app)



# ======================
# ROUTES
# ======================

from routes import routes

app.register_blueprint(routes)



# ======================
# CREATE TABLES
# ======================

with app.app_context():

    from models import User, Task

    db.create_all()



@app.route("/")
def home():

    return {
        "message": "BusyBear API is running 🐻"
    }



if __name__ == "__main__":

    app.run(debug=True)