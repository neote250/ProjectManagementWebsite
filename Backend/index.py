from flask import Flask, jsonify, request
from Backend.MongoDAL import MongoDAL
import Settings
app = Flask(__name__)
dal = MongoDAL()
dbs = Settings.databaseSchema

def checkForAttrubutes(required, keys):
    for key in keys:
        if key not in required:
            return False
    return True

def uppercaseDataAndKeys(data):
    uppercasedata = {}
    for key in data.keys():
        uppercasedata[key.upper()] = data[key]
    return uppercasedata, uppercasedata.keys()

#todo write tests (make nephi do this)

#todo add projects & document schema
    #todo add tasks with timeframes attached & document schema

#todo shoehorn ai

@app.route("/create/<Object>", methods=["POST"])
def create(Object):
    # data from the request
    data, keys = uppercaseDataAndKeys(request.json)
    obj = Object.upper()

    #Check the database schema for the endpoint
    if obj not in dbs.keys():
        return {"error": f"Endpoint /create/{Object} not found."}

    #Check for required fields
    if not checkForAttrubutes(keys, dbs[obj]["createFields"]):
        return {"error": f"{dbs[obj]['createFields']} are all required to create a(n) {Object}."}

    #Send data to the DAL
    return dal.create(obj, data)

@app.route("/get/<Object>", methods=["POST, GET"]) #Done
def get(Object):
    # data from the request
    data, keys = uppercaseDataAndKeys(request.json)
    obj = Object.upper()

    #Check the schema for the endpoint
    if obj not in dbs.keys():
        return {"error": f"Endpoint /get/{Object} not found."}

    #Check for required fields
    if not checkForAttrubutes(keys, dbs[obj]["requiredGetFields"]):
        return {"error": f"{dbs[obj]["requiredGetFields"]} are all required to fetch from a(n) {Object}."}
    #Send data to the DAL
    return dal.get(obj, data)

@app.route("/update/<Object>/<Field>", methods=["POST, PUT"])
def update(Object, Field):
    # data from the request
    data, keys = uppercaseDataAndKeys(request.json)
    obj = Object.upper()
    field = Field.upper()

    # Check the schema for the endpoint
    if obj not in dbs.keys():
        return {"error": f"Endpoint /update/{Object} not found."}

    # Check for required fields
    if not checkForAttrubutes(keys, dbs[obj]["requiredUpdateFields"]):
        return {"error": f"{dbs[obj]["requiredUpdateFields"]} are all required to update a(n) {Object}."}

    #Check the schema if the filed is updatable
    if field not in dbs[obj]["updateFields"]:
        return {"error": f"/update/{Object}/{Field} is not mutable, or does not exist."}

    #Send data to the DAL
    return dal.update(obj, field, data)

@app.route("/delete/<Object>", methods=["POST, DELETE"])
def delete(Object):
    # data from the request
    data, keys = uppercaseDataAndKeys(request.json)
    obj = Object.upper()

    # Check the schema for the endpoint
    if obj not in dbs.keys():
        return {"error": f"Endpoint /delete/{Object} not found."}

    if not checkForAttrubutes(keys, dbs[obj]["requiredDeleteFields"]):
        return {"error": f"{dbs[obj]["requiredDeleteFields"]} are all required to delete a(n) {Object}."}

    return dal.delete(obj, data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)