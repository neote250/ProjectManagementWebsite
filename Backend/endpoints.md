<h1> Things to Remember: </h1>
<ul>
    <li>All data going in and out will be in JSON.</li>
    <li>The fields will all be cAsE SeNsItIvE, so please copy and paste the stuff in qoutes</li>
    <li>If you dont understand anything just hmu</li>
    <li>if you change ANYTHING PING ME IN DISCORD 10x PLEASE (I'm TeaJay) </li>
    <li>You only have 1440 mins in a day, so enjoy every one of them :) </li>
</ul>

<hr>
    <h1> /Register </h1>
    <p> Registers a new user to the system, Please do some form of conformation on the frontend, or just tell me to do that <br> Returns a token for the new user, hmu if you want to force login after the new account is made, or to add fields.
    </p>
    <h3> Input(s): </h3>
    <ul>
        <li> { "username" : the username , "password" : the password , "displayName" : the displayname } </li>
    </ul>
    <h3> Output(s): </h3>
    <ul>
        <li> (Success) { "token" : token } </li>
        <li> (Failure) { "error" : "usernameExists" } </li>
        <li> (Failure) { "error" : "requiredDataNotProvided" } </li>
    </ul>

<hr>
    <h1> /Login </h1>
        <p> Creates a token for the client to use, embed it as a cookie please. Each token will expire after 3 hours. </p>
    <h3> Input(s): </h3>
        <ul>
            <li> { "username" : the username , "password" : the password } </li>
        </ul>
    <h3> Output(s): </h3>
        <ul>
            <li> (Success) { "token" : the  token } </li>
            <li> (Failure, Username incorrect) { "error" : "usernameIncorrect" } </li>
            <li> (Failure, Password incorrect) { "error" : "passwordIncorrect" } </li>
            <li> (Failure) { "error" : "requiredDataNotProvided" } </li>
        </ul>
<hr>
    <h1> /RefreshToken </h1>
        <p> Returns a new token </p>
    <h3> Input(s): </h3>
        <ul>
            <li> { "token" : old token } </li>
        </ul>
    <h3> Output(s): </h3>
        <ul>
            <li> { "token" : new token } </li>
            <li> { "error" : "tokenNotFound" } </li>
            <li> (Failure) { "error" : "requiredDataNotProvided" } </li>
        </ul>
<hr>
    <h1> /ChangeUsername </h1>
        <p> Changes the username. </p>
    <h3> Input(s): </h3>
        <ul>
            <li> { "token" : the token , "password" : current password , "newUsername" : the new username } </li>
        </ul>
    <h3> Output(s): </h3>
        <ul>
            <li> (Success) { "success" : token } </li>
            <li> (Failure, Username incorrect) { "error" : "usernameIncorrect" } </li>
            <li> (Failure, Password incorrect) { "error" : "passwordIncorrect" } </li>
            <li> (Failure) { "error" : "requiredDataNotProvided" } </li>
        </ul>

<hr>
    <h1> /ChangePassword </h1>
        <p> Changes the password. </p>
    <h3> Input(s): </h3>
        <ul>
            <li> { "username" : current username , "password" : current password , "newPassword" : the new password } </li>
            <li> { "token" : the token , "password" : current password , "newPassword" : the new password } </li>
        </ul>
    <h3> Output(s): </h3>
        <ul>
            <li> (Success) { "success" : token } </li>
            <li> (Failure, Username incorrect) { "error" : "usernameIncorrect" } </li>
            <li> (Failure, Password incorrect) { "error" : "passwordIncorrect" } </li>
            <li> (Failure) { "error" : "requiredDataNotProvided" } </li>
        </ul>

<hr>
    <h1> /ChangeDisplayName </h1>
        <p> Changes the displayname. </p>
    <h3> Input(s): </h3>
        <ul>
            <li> { "username" : current username , "password" : current password , "newDisplayName" : the new displayname } </li>
            <li> { "token" : the token , "password" : current password , "newDisplayName" : the new displayname } </li>
        </ul>
    <h3> Output(s): </h3>
        <ul>
            <li> (Success) { "success" : token } </li>
            <li> (Failure, Username incorrect) { "error" : "usernameIncorrect" } </li>
            <li> (Failure, Password incorrect) { "error" : "passwordIncorrect" } </li>
            <li> (Failure) { "error" : "requiredDataNotProvided" } </li>
        </ul>

<hr>
    <h1> /route </h1>
        <p> description </p>
    <h3> Input(s): </h3>
        <ul>
            <li> {} </li>
        </ul>
    <h3> Output(s): </h3>
        <ul>
            <li> {} </li>
        </ul>