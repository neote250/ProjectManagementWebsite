import pymongo, hashlib, random, Settings
dbs = Settings.databaseSchema
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

    # helper functions

    def newToken(self, userID):
        """
        Creates a new token from a userID
        :param userID: the id of the user
        :return: error or token
        """

        #Check if the user exists
        if self.users.find_one({ "_id": userID }) is None:
            return {"error": "userNotFound"}

        #Delete any existing tokens for the user
        if self.tokens.find_one({ "_id": userID }) is not None:
            self.tokens.delete_one({ "_id": userID })

        #Generate new token
        generating = True
        token = ""
        while generating:
            token = ""

            #Randomly generate a token
            for x in range(0, self.tokenLen):
                token += random.choice(self.tokenchars)

            #Make sure the token doesn't exist already
            if self.tokens.find_one({"TOKEN": token}) is None:
                self.tokens.insert_one({"_id":userID,"TOKEN": token})
                generating = False

        #return generated token
        return token

    def refreshToken(self,token):
        '''
        Refresh token
        :param token: old token
        :return: new token or "token not found"
        '''
        #Look for token
        tokenquerry = self.tokens.find_one({"TOKEN": token})
        if tokenquerry is None:
            return "token not found"
        self.tokens.delete_one({"TOKEN": token})
        newtoken = self.newToken(tokenquerry.get("_id"))
        return newtoken

    def getUser(self, token):
        """
        Retrieves a user
        :param token: the user's session token
        :return: The user entry, without the password hash
        """
        tokenquerry = self.tokens.find_one({ "TOKEN": token })
        if tokenquerry is None:
            return {"error": "tokenNotFound"}
        user = self.users.find_one({ "_id": tokenquerry.get("_id")})
        if user is None:
            return {"error": "userNotFound"}
        user = dict(user)
        user.pop("password", None)
        return dict(user)

    #crud functions

    def create(self, Object, data):
        match Object:
            case "USER":
                #Check if the username is already used
                user = self.users.find_one({"USERNAME": data["USERNAME"]})
                if user is not None:
                    return {"error": "usernameExists"}

                #Insert to the database
                #TODO update the user fields
                user = self.users.insert_one(
                    {
                        "USERNAME": data["USERNAME"],
                        "PASSWORD": hashlib.sha512(data["PASSWORD"].encode(), usedforsecurity=True).hexdigest(),
                        "DISPLAYNAME": data["DISPLAYNAME"],

                    })

                #Generate a token, and return it
                token = self.newToken(user.inserted_id)
                return {"token": token}
            case "TOKEN":
                #Check if the username exists
                user = self.users.find_one({"USERNAME": data["USERNAME"]})
                if user is None:
                    return {"error": "usernameIncorrect"}

                #Check the password hash
                if user.get("PASSWORD") != hashlib.sha512(data["PASSWORD"].encode(), usedforsecurity=True).hexdigest():
                    return {"error": "passwordIncorrect"}

                #Generate a new token
                token = self.newToken(user.get("_id"))
                return {"token": token}
            #TODO implement from here
            case "TEAM":
                return
            case "PROJECT":
                return
            case "TASK":
                return
            case "COMMENT":
                return
            case "DOCUMENT":
                return
        return {"error": "Something went wrong"}

    def get(self, Object, data):
        match Object:
            #todo implement from here
            case "USER":
                token = self.tokens.find_one({"TOKEN": data["TOKEN"]})
                if token is None:
                    return {"error": "tokenNotFound"}
                user = self.users.find_one({"_id": token.get("_id")})
                if user is None:
                    return {"error": "userNotFound"}
                user = dict(user)
                returndict = {}
                for key in Settings.databaseSchema[Object]["getFields"]:
                    if key in user.keys():
                        returndict[key] = str(user[key])
                return returndict
            case "TOKEN":
                return {"TOKEN":self.refreshToken(data["TOKEN"])}
            case "TEAM":
                return
            case "PROJECT":
                return
            case "TASK":
                return
            case "COMMENT":
                return
            case "DOCUMENT":
                return
        return {"error": "Something went wrong"}

    def update(self, Object, field, data):
        match Object:
            #todo implement from here
            case "USER":

                return
            case "TEAM":
                return
            case "PROJECT":
                return
            case "TASK":
                return
            case "COMMENT":
                return
            case "DOCUMENT":
                return
        return {"error": "Something went wrong"}

    def delete(self, Object, data):
        match Object:
            #todo implement from here
            case "USER":

                return
            case "TEAM":
                return
            case "PROJECT":
                return
            case "TASK":
                return
            case "COMMENT":
                return
            case "DOCUMENT":
                return
        return {"error": "Something went wrong"}




    def changeUsername(self, token, password, newUsername):
        """
        Changes the username
        :param token: The token of the user
        :param password: The password of the user
        :param newUsername: The new username
        :return: error or token
        """
        userid = self.tokens.find_one({ "TOKEN": token })
        if userid is None:
            return {"error": "tokenNotFound"}
        user = self.users.find_one({ "_id": userid.get("_id") })
        if user is None:
            return {"error": "tokenNotFound"}
        if user.get("PASSWORD") != hashlib.sha512(password.encode(),usedforsecurity=True).hexdigest():
            return {"error": "passwordIncorrect"}
        self.users.update_one({ "_id": user.get("_id")}, {"$set": { "username": newUsername }})
        return self.newToken(userid.get("_id"))
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
        return self.newToken(userid.get("_id"))
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
        return self.newToken(userid.get("_id"))
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