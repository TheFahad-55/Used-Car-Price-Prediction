const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.headers['x-auth'];
    if (!token) {
        return res.status(401).send("UnAutorized Token not  provided");
    }
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    if (!decoded) {
        return res.status(401).send("UnAutorized Token not  provided");
    }
    req.user = decoded;
    next();
}