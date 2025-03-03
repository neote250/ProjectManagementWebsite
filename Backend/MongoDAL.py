import string, pymongo, hashlib, random, Settings

class MongoDAL:
    def __init__(self):
        mongo = pymongo.MongoClient(Settings.mongoConnectionString)
        self.database = mongo.get_database(Settings.databaseName)
        self.tokenchars = Settings.tokenChars
        self.tokenLen = Settings.tokenLength
        #Collections
        self.users = self.database.get_collection("users")
        self.tokens = self.database.get_collection("tokens")

        self.logs = self.database.get_collection("logs") #todo: implement logging
        self.counters = self.database.get_collection("counters")

    #auth
    def login(self, username, password):
        """
        Logs in a user, returning the token
        :param username: Username to login
        :param password: Password to login (plaintext)
        :return: Token or Error if login fails
        """
        user = self.users.find_one({ "username": username })
        if user is None:
            return {"error": "usernameIncorrect"}
        if user.get("password") != hashlib.sha512(password.encode(),usedforsecurity=True).hexdigest():
            return {"error": "passwordIncorrect"}
        token = self.tokenFromUserID(user.get("_id"))
        return {"token": token}
    def tokenFromToken(self, token):
        """
        Regenerates a new token, using the old one
        :param token: old token
        :return: new token
        """
        tokenquerry = self.tokens.find_one({ "token": token })
        if tokenquerry is None:
            return {"error": "tokenNotFound"}
        self.tokens.delete_one({ "token": token })
        newtoken = self.tokenFromUserID(tokenquerry.get("_id"))
        return {"token":newtoken}
    def tokenFromUserID(self, userID):
        """
        Creates a new token from a userID
        :param userID: the id of the user
        :return: error or token
        """
        if self.users.find_one({ "_id": userID }) is None:
            return {"error": "userNotFound"}
        if self.tokens.find_one({ "_id": userID }) is not None:
            self.tokens.delete_one({ "_id": userID })
        generating = True
        token = ""
        while generating:
            token = ""
            for x in range(0, self.tokenLen):
                token += random.choice(self.tokenchars)
            if self.tokens.find_one({"token": token}) is None:
                self.tokens.insert_one({"_id":userID,"token": token})
                generating = False
        return token

    #user stuff
    def newUser(self, username, password, displayName):
        """
        Registers a new user
        :param username: username to register
        :param password: password to register (plaintext)
        :param displayName: display name to register
        :return: error or token for the new user
        """
        user = self.users.find_one({ "username": username })
        if user is not None:
            return {"error": "usernameExists"}
        user = self.users.insert_one(
            {"username": username,
             "password": hashlib.sha512(password.encode(),usedforsecurity=True).hexdigest(),
             "displayName": displayName})
        token = self.tokenFromUserID(user.inserted_id)
        return {"token": token}
    def getUser(self, token):
        """
        Retrieves a user
        :param token: the user's session token
        :return: The user entry, without the password hash
        """
        tokenquerry = self.tokens.find_one({ "token": token })
        if tokenquerry is None:
            return {"error": "tokenNotFound"}
        user = self.users.find_one({ "_id": tokenquerry.get("_id")})
        if user is None:
            return {"error": "userNotFound"}
        user = dict(user)
        user.pop("password", None)
        return dict(user)
    def changeUsername(self, token, password, newUsername):
        """
        Changes the username
        :param token: The token of the user
        :param password: The password of the user
        :param newUsername: The new username
        :return: error or token
        """
        userid = self.tokens.find_one({ "token": token })
        if userid is None:
            return {"error": "tokenNotFound"}
        user = self.users.find_one({ "_id": userid.get("_id") })
        if user is None:
            return {"error": "tokenNotFound"}
        if user.get("password") != hashlib.sha512(password.encode(),usedforsecurity=True).hexdigest():
            return {"error": "passwordIncorrect"}
        self.users.update_one({ "_id": user.get("_id")}, {"$set": { "username": newUsername }})
        return self.tokenFromUserID(userid.get("_id"))
    def changePassword(self, token, password, newPassword):
        """
        Changes the password
        :param token: The token of the user
        :param password: The password of the user
        :param newPassword: The new password of the user
        :return: error or token
        """
        userid = self.tokens.find_one({"token": token})
        if userid is None:
            return {"error": "tokenNotFound"}
        user = self.users.find_one({"_id": userid.get("_id")})
        if user is None:
            return {"error": "tokenNotFound"}
        if user.get("password") != hashlib.sha512(password.encode(), usedforsecurity=True).hexdigest():
            return {"error": "passwordIncorrect"}
        self.users.update_one({"_id": user.get("_id")}, {"$set": {"password": hashlib.sha512(newPassword.encode(), usedforsecurity=True).hexdigest()}})
        return self.tokenFromUserID(userid.get("_id"))
    def changeDisplayName(self, token, password, newDisplayName):
        """
        Changes the display name
        :param token: The token of the user
        :param password: The password of the user
        :param newDisplayName: The new display name of the user
        :return: error or token
        """
        userid = self.tokens.find_one({"token": token})
        if userid is None:
            return {"error": "tokenNotFound"}
        user = self.users.find_one({"_id": userid.get("_id")})
        if user is None:
            return {"error": "tokenNotFound"}
        if user.get("password") != hashlib.sha512(password.encode(), usedforsecurity=True).hexdigest():
            return {"error": "passwordIncorrect"}
        self.users.update_one({"_id": user.get("_id")}, {"$set": {"displayName": newDisplayName}})
        return self.tokenFromUserID(userid.get("_id"))
    def deleteUser(self, token, password):
        userfromtoken = self.tokens.find_one({ "token": token })
        if userfromtoken is None:
            return {"error": "Token not found"}
        user = self.users.find_one({ "_id": userfromtoken.get("_id")})
        if user is None:
            return {"error": "User not found"}
        if user.get("password") != hashlib.sha512(password.encode(), usedforsecurity=True).hexdigest():
            return {"error": "Password incorrect"}
        self.users.delete_one({"_id": user.get("_id")})
        return {"sucess": True}

    #project stuff
    def createTeam(self, data):
        NotImplementedError()
    def modifyTeam(self, data):
        NotImplementedError()
    def deleteTeam(self, data):
        NotImplementedError()

    def createProject(self, data):
        NotImplementedError()
    def modifyProject(self, data):
        NotImplementedError()
    def deleteProject(self, data):
        NotImplementedError()

    def createTask(self, data):
        NotImplementedError()
    def modifyTask(self, data):
        NotImplementedError()
    def deleteTask(self, data):
        NotImplementedError()

    def addDocument(self, data):
        NotImplementedError()
    def deleteDocument(self, data):
        NotImplementedError()

    def createComment(self, data):
        NotImplementedError()
    def deleteComment(self, data):
        NotImplementedError()