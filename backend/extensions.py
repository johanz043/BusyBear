# Imports and calls SQLAlchemy, multiple functions call on this and extensions.py is created to basically avoid multiple imports of the same thing

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()