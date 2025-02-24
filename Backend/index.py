from flask import Flask, jsonify, request
from Backend.MongoDAL import MongoDAL
#todo: Add & document delete
app = Flask(__name__)
dal = MongoDAL()
def checkForAttrubutes(keys, required):
    for key in keys:
        if key not in required:
            return False
    return True

@app.route("/Register", methods=["POST"])
def register():
    data = request.json
    keys = data.keys()
    if checkForAttrubutes(keys, ["username", "password", "displayName"]):
        return jsonify({"error": "requiredDataNotProvided"})
    username = data["username"]
    password = data["password"]
    displayName = data["displayName"]
    return dal.newUser(username, password, displayName)

@app.route("/Login", methods=["POST"])
def login():
    data = request.json
    keys = data.keys()
    if checkForAttrubutes(keys, ["username", "password"]):
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
    data = request.json
    keys = data.keys()
    if checkForAttrubutes(keys, []):
        return jsonify({"error": "requiredDataNotProvided"})
    token = data["token"]
    password = data["password"]
    newUsername = data["newUsername"]
    return dal.changeUsername(token , password, newUsername)

@app.route("/ChangePassword", methods=["POST"])
def changePassword():
    data = request.json
    keys = data.keys()
    if checkForAttrubutes(keys, []):
        return jsonify({"error": "requiredDataNotProvided"})
    token = data["token"]
    password = data["password"]
    newPassword = data["newPassword"]
    return dal.changePassword(token, password, newPassword)

@app.route("/ChangeDisplayName", methods=["POST"])
def changeDisplayName():
    data = request.json
    keys = data.keys()
    if checkForAttrubutes(keys, []):
        return jsonify({"error": "requiredDataNotProvided"})
    token = data["token"]
    password = data["password"]
    newDisplayName = data["newDisplayName"]
    return dal.changeDisplayName(token, password, newDisplayName)

#@app.route("/", methods=["POST"])
#def index():
#data = request.json
#    keys = data.keys()
#    if checkForAttrubutes(keys, []):
#        return jsonify({"error": "requiredDataNotProvided"})
#    #todo: implement
#   return

if __name__ == '__main__':
    app.run(debug=True, port=5000)