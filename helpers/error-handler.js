function errorHandler(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {

        //jwt authentication error
        return res.status(401).json({messsage: "The user is not authorised."})
    }

    if(err.name === 'ValidationError'){
        //validation error
        return res.status(401).json({messsage: err})
    }

    //default to 500 server error
    return res.status(500).json({messsage: err});
}

module.exports = errorHandler;