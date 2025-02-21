from flask import Flask, jsonify, request
from Backend.MongoDAL import MongoDAL
#todo: Add & document delete
app = Flask(__name__)
dal = MongoDAL()
@app.route("/Register", methods=["POST"])
def register():
    data = request.json
    keys = data.keys()
    if "username" not in keys:
        return jsonify({"error": "requiredDataNotProvided"})
    if "password" not in keys:
        return jsonify({"error": "requiredDataNotProvided"})
    if "displayName" not in keys:
        return jsonify({"error": "requiredDataNotProvided"})
    username = data["username"]
    password = data["password"]
    displayName = data["displayName"]
    return dal.newUser(username, password, displayName)

@app.route("/Login", methods=["POST"])
def login():
    data = request.json
    keys = data.keys()
    if "username" not in keys:
        return jsonify({"error": "requiredDataNotProvided"})
    if "password" not in keys:
        return jsonify({"error": "requiredDataNotProvided"})
    username = data["username"]
    password = data["password"]
    return dal.login(username, password)

@app.route("/RefreshToken", methods=["POST"])
def refreshToken():
    data = request.json
    keys = data.keys()
    if "token" not in keys:
        return jsonify({"error": "requiredDataNotProvided"})
    return dal.tokenFromToken(data["token"])

@app.route("/ChangeUsername", methods=["POST"])
def changeUsername():
    response = {}
    data = request.json
    #todo: implement
    return jsonify(response)

@app.route("/ChangePassword", methods=["POST"])
def changePassword():
    response = {}
    data = request.json
    #todo: implement
    return jsonify(response)

@app.route("/ChangeDisplayName", methods=["POST"])
def changeDisplayName():
    response = {}
    data = request.json
    #todo: implement
    return jsonify(response)

#@app.route("/", methods=["POST"])
#def index():
#    response = {}
#    data = request.json
#
#    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5000)