import MongoDAL
dal = MongoDAL.MongoDAL()

#Add a new user
newuser = dal.newUser("tim","tim123","Tim Tom")
print(f"New User's Token: {newuser.get("token")}")

#Find the user from the token
user = dal.getUser(newuser.get("token"))
print(f"User found from token: {user}")

#Pause to probe the database
input("Press enter to continue...")

#Log in to the new user, changing the token
login = dal.login("tim","tim123")
print(f"New Token from login {login.get('token')}")

#Use the new token to find the user
user = dal.getUser(login.get("token"))
print(f"User found from new Token: {user}")

#Regenerate the token
newusertoken = dal.tokenFromToken(login.get("token"))
print(f"New Token from token {newusertoken}")



