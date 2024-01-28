Hi this readme file contains all the required knowledge needed to run the backend of the app DoraEcom.

To run the backend use command:
nodemon app.js

// BACKEND FLOW:
Models --> Controllers --> Routes --> Driver (App.js)

//Authentication flow:
|| USER || --- User signin ---> || Authentication server || 
--- User Authenticated, Jwt created and returned to user ---> || USER || 
--- User passes JWT when invoking the api calls ---> || Applicatoin Server || 
--- Application verifies and processes api calls ---> || USER ||

To make our server protected we make sure that our api is not used or accessed without a token.
library express-jwt > is used to secure the apis to our server

isRevoked is used to whether the user has the permission to use the admin panel or not. if a customer tries to modify any product he must get an authorised error.