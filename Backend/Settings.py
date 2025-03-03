import string

#backend settings
mongoConnectionString = "mongodb://localhost:27017"
databaseName = "test"
tokenChars = list(string.ascii_letters + string.digits + string.punctuation)
tokenLength = 128

#the big kahuna
databaseSchema = {
    "USER": {
        "createFields": [], #index

        "requiredGetFields": [], #index
        "getFields": [], #dal

        "requiredUpdateFields": [], #index
        "updateFields": [], #index

        "requiredDeleteFields": [], #index

        "allFields":[] #nowhere
    },
    "TEAM": {
        "log": True,
        "createFields": ["NAME","DESCRIPTION","ADMIN"],
        "changeableFields": ["MEMBER","ADMIN"],
        "getFields": ["NAME","DESCRIPTION","MEMBER","ADMIN"],
    },
    "PROJECT": {
        "log": True,
        "createFields": ["NAME","DESCRIPTION","TEAM"],

        "requiredFields": [],
        "changeableFields": ["NAME","DESCRIPTION","TEAM","DOCUMENT"],
        "getFields": ["NAME","DESCRIPTION","TEAM","DOCUMENT"],
    },
    "TASK": {
        "log": True,
        "createFields": ["NAME","DESCRIPTION","PROJECT","PRIORITY","STATUS","COMPLETIONTIME"],

        "requiredFields": [],
        "changeableFields": ["NAME","DESCRIPTION","PRIORITY","STATUS","COMPLETIONTIME"],
        "getFields": ["NAME","DESCRIPTION","PROJECT","PRIORITY","STATUS","COMPLETIONTIME"],
    },
    "COMMENT": {
        "log": True,
        "createFields": ["TEAMID","TEXT","AUTHOR","CREATED"],

        "requiredFields": [],
        "changeableFields": ["TEXT"],
        "getFields": ["TEAMID","TEXT","AUTHOR","CREATED"],
    },
    "DOCUMENT": {
        "log": True,
        "createFields": ["FILENAME","DATA"],

        "requiredFields": [],
        "changeableFields": [],
        "getFields": ["FILENAME","DATA"],
    },
    "name": {
        "log": True,
        "createFields": [],

        "requiredFields": [],
        "changeableFields": [],
        "getFields": [],
    }
}


USER = {
    "_id":"id of the user",
    "username":"the username",
    "displayName":"the display name",
    "password":"sha-512 hash of the password (in hex)",
}

logs = {
    "_id":"sequential id, as reflected in counters",
    "timestamp":"the timestamp",
    "userID": "the user ID",
    "action":"the action"
}

counters = {
        "_id":"what your counting",
        "counter":0}

tokens = {
    "_id":"id of the user",
    "token":"the token"
}