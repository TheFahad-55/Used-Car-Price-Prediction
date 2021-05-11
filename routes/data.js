const express = require("express");

const asyncMiddleware = require("../middleware/async").asyncMiddleware;

const router = express.Router();

const UniqueData = require('../models/UniqueData').UniqueData;

//@route    /data   GET
//@description  Get data for user , so that he can choose from that.
//@access         Public
router.get(
    "/data",
    asyncMiddleware(async(req, res) => {
        const data = await UniqueData.findOne({ _id: '6098e3eb139ca32b582a1f94' });
        res.status(200).json(data);





    }));

module.exports = router;