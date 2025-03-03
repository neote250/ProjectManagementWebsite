from flask import Flask, jsonify, request
from Backend.MongoDAL import MongoDAL
app = Flask(__name__)
dal = MongoDAL()

def checkForAttrubutes(keys, required):
    for key in keys:
        if key not in required:
            return False
    return True

#todo write tests (make nephi do this)

#todo make json values case-insensitive

"""
/get/userdata
/get/tasks
/get/documents
/get/timeline
/get/team members
/get/users

/create/team
/create/task
/create/document

/update/team/*
/update/task/*
/update/document/*

/delete/team
/delete/task
/delete/document
"""


#todo add projects & document schema
    #todo add tasks with timeframes attached & document schema

#todo groundwork for comment system

#todo shoehorn ai

@app.route("/create/<Object>", methods=["POST"])
def create(Object):
    #data from the request
    data = request.json
    keys = data.keys()
    match(Object.upper()):
        case "USER":
            if checkForAttrubutes(keys, ["username", "password", "displayName"]):
                return jsonify({"error": "requiredDataNotProvided"})
            username = data["username"]
            password = data["password"]
            displayName = data["displayName"]
            return dal.newUser(username, password, displayName)
        case "TOKEN":
            if "username" not in keys:
                return jsonify({"error": "\"username\" not provided"})
            if "password" not in keys:
                return jsonify({"error": "\"password\" not provided"})
            username = data["username"]
            password = data["password"]
            return dal.login(username, password)
        case "TEAM":
            pass
        case "PROJECT":
            pass
        case "TASK":
            pass
        case "COMMENTS":
            pass
        case "DOCUMENTS":
            pass
    return {"error": f"Endpoint {Object} not found."}

@app.route("/get/<Object>", methods=["POST"])
def get(Object):
    data = request.json
    keys = data.keys()
    match(Object.upper()):
        case "USER":
            if "token" not in keys:
                return {"error": "\"token\" not provided"}
            return dal.getUser(data["token"])
        case "TOKEN":
            if "token" not in keys:
                return {"error": "\"token\" not provided."}
            return dal.tokenFromToken(data["token"])
        case "TEAM":
            pass
        case "PROJECT":
            pass
        case "TASK":
            pass
        case "COMMENTS":
            pass
        case "DOCUMENTS":
            pass


    return {"error": f"Endpoint {Object} not found."}

@app.route("/update/<Object>/<Field>", methods=["POST"])
def update(Object, Field):
    data = request.json
    keys = data.keys()
    match(Object.upper()):
        case "USER":
            if "token" not in keys:
                return {"error": "\"token\" not provided."}
            if "password" not in keys:
                return {"error": "\"password\" not provided."}
            token = data["token"]
            password = data["password"]
            match(Field.upper()):
                case "USERNAME":
                    if "newusername" not in keys:
                        return {"error": "\"newusername\" not provided"}
                    return dal.changeUsername(token, password, data["newusername"])
                case "PASSWORD":
                    if "newpassword" not in keys:
                        return {"error": "\"newpassword\" not provided"}
                    return dal.changePassword(token, password, data["newpassword"])
                case "DISPLAYNAME":
                    if "newdisplayname" not in keys:
                        return {"error": "\"newdisplayname\" not provided"}
                    return dal.changeDisplayName(token, data["newdisplayname"])
        case "TEAM":
            pass
        case "PROJECT":
            pass
        case "TASK":
            pass
        case "COMMENTS":
            pass
        case "DOCUMENTS":
            pass


    return {"error": f"Endpoint {Object} not found."}

@app.route("/delete/<Object>", methods=["POST"])
def delete(Object):
    data = request.json
    keys = data.keys()
    match(Object.upper()):
        case "USER":
            if "token" not in keys:
                return {"error": "\"token\" not provided."}
            if "password" not in keys:
                return {"error": "\"password\" not provided."}
            return dal.deleteUser(data["token"], data["password"])
        case "TEAM":
            pass
        case "PROJECT":
            pass
        case "TASK":
            pass
        case "COMMENTS":
            pass
        case "DOCUMENTS":
            pass
    return {"error": f"Endpoint {Object} not found."}

if __name__ == '__main__':
    app.run(debug=True, port=5000)