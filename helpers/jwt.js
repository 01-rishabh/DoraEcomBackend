const {expressjwt : jwt} = require("express-jwt");

function authJwt() {
    const secret = process.env.secret;
    return jwt({
        secret,
        algorithms: ["HS256"],
        //isRevoked: isRevoked
    }).unless({
        path: [
            
            {url: /\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/orders(.*)/ , methods: ['GET', 'OPTIONS', 'POST'] },
            
            '/users/login',
            '/users/createUser',
        ]
    })
}

// async function isRevoked(req, payload, done){
//     if(!payload.isAdmin){
//         done(null, true);
//     }

//     done();
// }

module.exports = authJwt;