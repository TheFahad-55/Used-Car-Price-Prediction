function asyncMiddleware(handler) {
    return (req, res, next) => {
        try {
            handler(req, res);
        } catch (err) {
            next(err);
        }
    };
}

module.exports.asyncMiddleware = asyncMiddleware;