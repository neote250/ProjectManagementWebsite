import requests
from psutil import users


def usetheapi(endpoint, json):
    with requests.post("http://127.0.0.1:5000"+endpoint, json=json) as response:
        return response.json()

#Create a user
use = usetheapi("/create/user",{"username":"hi","password":"fuck","displayname":"grah","bleh":"heh"})
print(f"New User: {use}")

#Check to see if it was stored properly
user = usetheapi("/get/user",{"token":use.get("token")})
print(f"Retreived User: {user}")

#Refresh the token
newtoken = usetheapi("/get/token",{"token":use.get("token")})
print(f"New Token: {newtoken}")

#Log back in
newnewtoken = usetheapi("/create/token",{"username":"hi","password":"fuck"})
print(f"New New Token: {newnewtoken}")