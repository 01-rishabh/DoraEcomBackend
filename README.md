Hi this readme file contains all the required knowledge needed to run the backend of the app DoraEcom.

To run the backend use command:
nodemon app.js



//Authentication flow:
|| USER || --- User signin ---> || Authentication server || 
--- User Authenticated, Jwt created and returned to user ---> || USER || 
--- User passes JWT when invoking the api calls ---> || Applicatoin Server || 
--- Application verifies and processes api calls ---> || USER ||