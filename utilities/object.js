const mongoose = require('mongoose');

module.exports.validateObjectId = function validateObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}