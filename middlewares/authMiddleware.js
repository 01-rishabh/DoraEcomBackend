const User = require("../models//User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler((req, res, next) => {
    // Implement authentication logic
    let token;
    if(req?.headers?.authorization?.startsWith("Bearer")){
      token = req.headers.authorization.split(" ")[1];
      try{
        if(token){
          const decoded = jwt.verify(token, process.env.secret);
          const user = User.findById(decoded?.id);
          req.user = user;
          next();
        }
      }catch(error){
        throw new Error(error);
      }
    }
    else{
      throw new Error("There is no token attached to header.");
    }
  });
  
  module.exports = authMiddleware;
  