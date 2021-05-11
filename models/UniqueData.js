const mongoose = require("mongoose");

const unqiueDataSchema = new mongoose.Schema({
    company: {
        type: [{ type: String }],
    },
    models: {
        type: [{ type: String }],
    },
    myear: {
        type: [{ type: Number }],
    },
    cities: {
        type: [{ type: String }],
    },
    colors: {
        type: [{ type: String }],
    },
    assembly: {
        type: [{ type: String }],
    },
    transmission: {
        type: [{ type: String }],
    },
    etype: {
        type: [{ type: String }],
    },
    ecapacity: {
        type: [{ type: String }],
    }

});

const UniqueData = mongoose.model("UniqueData", unqiueDataSchema);

module.exports.UniqueData = UniqueData;