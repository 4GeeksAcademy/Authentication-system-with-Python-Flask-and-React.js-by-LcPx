from flask import request, jsonify, Blueprint
from api.models import db, User
from api.utils import APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)
CORS(api)

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"msg": "Email e password são obrigatórios"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Este email já está registado"}), 409

    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Utilizador registado com sucesso"}), 201

@api.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"msg": "Email ou password inválidos"}), 401

    access_token = create_access_token(identity=email)
    return jsonify({"access_token": access_token, "user": user.serialize()}), 200

@api.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()

    if not user:
        return jsonify({"msg": "Utilizador não encontrado"}), 404

    return jsonify({"user": user.serialize()}), 200

@api.route("/hello", methods=["GET"])
def hello():
    return jsonify({"message": "Olá do backend!"}), 200
