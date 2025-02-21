users = {
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