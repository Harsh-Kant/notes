const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next){
    const token = req.headers.token;
    if(!token){
        res.status(403).send({
            message: "You are not logged in!"
        })
    }
    const decoded = jwt.verify(token, "harsh1234");
    const username = decoded.username;
    if(!username){
        res.status(403).json({
            message: "Malformed token"
        })
        return;
    }
    req.username = username;
    next();
}

module.exports = {
    authMiddleware
}