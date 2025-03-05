# /create
## /user
    Requires ["username", "password", "displayName"]
    Returns ["token"]
## /token
    Requires ["username","password"]
    Returns ["token"]


# /get
## /user
        Requires ["token"]
        Returns ["username", "displayname"]
## /token
        Requires ["token"]
        Returns ["token"]


# /update
## /user
### /username
    Requires ["token","password","newUser"]
    Returns ["token"]
### /password
    Requires ["token","password","newPassword"]
    Returns ["token"]
### /displayname
    Requires ["token","password","newdisplayname"]
    Returns ["token"]


# /delete
## /user
    Requires ["token","password"]
    Returns ["success"]