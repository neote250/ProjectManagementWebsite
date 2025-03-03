import string

#backend settings
mongoConnectionString = "mongodb://localhost:27017"
databaseName = "test"
tokenChars = list(string.ascii_letters + string.digits + string.punctuation)
tokenLength = 128

databaseSchema = {
    "USER": {
        "log": True,
        "required": [],
        "fields": [],
        "getFields": [],
    },
    "TEAM": {
        "log": True,
        "required": ["NAME","DESCRIPTION","ADMIN"],
        "setFields": ["MEMBER","ADMIN"],
        "getFields": ["NAME","DESCRIPTION","MEMBER","ADMIN"],
    },
    "PROJECT": {
        "log": True,
        "required": ["NAME","DESCRIPTION","TEAM"],
        "setFields": ["NAME","DESCRIPTION","TEAM","DOCUMENT"],
        "getFields": ["NAME","DESCRIPTION","TEAM","DOCUMENT"],
    },
    "TASK": {
        "log": True,
        "required": ["NAME","DESCRIPTION","PROJECT","PRIORITY","STATUS","COMPLETIONTIME"],
        "setFields": ["NAME","DESCRIPTION","PRIORITY","STATUS","COMPLETIONTIME"],
        "getFields": ["NAME","DESCRIPTION","PROJECT","PRIORITY","STATUS","COMPLETIONTIME"],
    },
    "COMMENT": {
        "log": True,
        "required": ["TEAMID","TEXT","AUTHOR","CREATED"],
        "setFields": ["TEXT"],
        "getFields": ["TEAMID","TEXT","AUTHOR","CREATED"],
    },
    "DOCUMENT": {
        "log": True,
        "required": ["FILENAME","DATA"],
        "setFields": [],
        "getFields": ["FILENAME","DATA"],
    },
    "name": {
        "log": True,
        "required": [],
        "setFields": [],
        "getFields": [],
    }
}