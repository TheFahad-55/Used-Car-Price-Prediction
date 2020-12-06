module.exports = function(req, res, next) {
    const isAdmin = req.user.isAdmin;
    if (!isAdmin) {
        return res.status(403).send("Forbidden");
    }
    next();


}