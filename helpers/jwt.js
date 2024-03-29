const {expressjwt : jwt} = require("express-jwt");

function authJwt() {
    const secret = process.env.secret;
    return jwt({
        secret,
        algorithms: ["HS256"],
        //isRevoked: isRevoked
    }).unless({
        path: [
            //without authorisation endpoints
            {url: /\/products(.*)/ , methods: ['GET', 'OPTIONS', 'POST', 'PUT', 'DELETE'] },
            {url: /\/orders(.*)/ , methods: ['OPTIONS'] },
            
            //with authorisation endpoints
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