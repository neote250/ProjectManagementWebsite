import string

#backend settings
mongoConnectionString = "mongodb://localhost:27017"
databaseName = "test"
tokenChars = list(string.ascii_letters + string.digits + string.punctuation)
tokenLength = 128

#the big kahuna
databaseSchema = {
    "USER": {
        "createFields": ["USERNAME","PASSWORD","DISPLAYNAME"], #index

        "requiredGetFields": ["TOKEN"], #index
        "getFields": ["_id","USERNAME","DISPLAYNAME","TEAMS"], #dal

        "requiredUpdateFields": ["TOKEN","PASSWORD"], #index
        "updateFields": ["USERNAME","DISPLAYNAME","PASSWORD","ADDTOTEAM","REMOVEFROMTEAM"], #index

        "requiredDeleteFields": ["TOKEN","PASSWORD"], #index

        "allFields":["USERNAME","PASSWORD","DISPLAYNAME","TEAMS"] #dal
    },
    "TEAM": {
        "createFields": ["NAME","DESCRIPTION","TOKEN"],  # index

        "requiredGetFields": ["TOKEN","TEAMID"],  # index
        "getFields": ["NAME","DESCRIPTION","MEMBERS","ADMINS","PROJECTS"],  # dal

        "requiredUpdateFields": ["TOKEN","ID"],  # index
        "updateFields": ["ADDADMIN","ADDUSER","REMOVEADMIN","REMOVEUSER","NAME","DESCRIPTION","ADDPROJECT","REMOVEPROJECT"],  # index

        "requiredDeleteFields": ["TOKEN","ID","PASSWORD"],  # index

        "allFields": ["NAME","DESCRIPTION","MEMBERS","ADMINS","PROJECTS"]  # dal
    },
    "PROJECT": {
        "createFields": ["NAME","DESCRIPTION","TOKEN","TEAMID"], #index

        "requiredGetFields": ["TOKEN","PROJECTID"], #index
        "getFields": ["NAME","DESCRIPTION","DOCUMENTS","TASKS","TEAMID"], #dal

        "requiredUpdateFields": ["TOKEN"], #index
        "updateFields": ["ADDDOCUMENT","REMOVEDOCUMENT","NAME","DESCRIPTION"], #index

        "requiredDeleteFields": ["TOKEN","PASSWORD"], #index

        "allFields":["NAME","DESCRIPTION","TEAM","DOCUMENTS","TASKS"] #dal
    },
    "TASK": {
        "createFields": ["NAME","DESCRIPTION","PROJECTID","TOKEN"], #index

        "requiredGetFields": ["TOKEN"], #index
        "getFields": ["NAME","DESCRIPTION","PROJECTID","PRIORITY","STATUS","COMPLETIONTIME","USERSASSIGNED"], #dal

        "requiredUpdateFields": ["TOKEN","TASKID"], #index
        "updateFields": ["NAME","DESCRIPTION","PRIORITY","STATUS","ADDUSER","REMOVEUSER","COMPLETIONTIME"], #index

        "requiredDeleteFields": ["TOKEN"], #index

        "allFields":["NAME","DESCRIPTION","PROJECTID","PRIORITY","STATUS","COMPLETIONTIME","USERSASSIGNED"] #dal
    },
    "COMMENT": {
        "createFields": ["TEXT","TEAMID","TOKEN"], #index

        "requiredGetFields": ["TEAMID","TOKEN"], #index
        "getFields": ["TEXT","AUTHOR","CREATED","COMMENTID","TEAMID"], #dal

        "requiredUpdateFields": [], #index #TODO edit comment?
        "updateFields": [], #index

        "requiredDeleteFields": ["TOKEN","COMMENTID"], #index

        "allFields":[] #dal
    },
    "DOCUMENT": { #todo figure out what im doing here
        "createFields": [], #index

        "requiredGetFields": [], #index
        "getFields": [], #dal

        "requiredUpdateFields": [], #index
        "updateFields": [], #index

        "requiredDeleteFields": [], #index

        "allFields":[] #dal
    },
    "TOKEN":{
        "createFields":["USERNAME","PASSWORD"],
        "requiredGetFields":["TOKEN"]
    },
    "name": {
        "createFields": [], #index

        "requiredGetFields": [], #index
        "getFields": [], #dal

        "requiredUpdateFields": [], #index
        "updateFields": [], #index

        "requiredDeleteFields": [], #index

        "allFields":[] #dal
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