from flask import Flask
from flask_cors import CORS

from extensions import db


app = Flask(__name__)


CORS(app)


app.config["SQLALCHEMY_DATABASE_URI"] = (
    "postgresql://postgres:[shelteRsn17ail]@db.odfvbghzqewofzlxwmww.supabase.co:5432/postgres"
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False



db.init_app(app)



from routes import routes

app.register_blueprint(routes)



with app.app_context():

    db.create_all()



@app.route("/")
def home():

    return {
        "message": "BusyBear API is running 🐻"
    }



if __name__ == "__main__":

    app.run(
        debug=True
    )