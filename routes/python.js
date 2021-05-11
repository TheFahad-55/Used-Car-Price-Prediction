const express = require('express');

const router = express.Router();

const { spawn } = require('child_process');

const Car = require('../models/Car').Car;

const validateCar = require('../models/Car').validateCar;

const asyncMidleware = require('../middleware/async').asyncMiddleware;



//@route    /python/sendCarData  POST 
//@description  Make Prediction,Data coming from Angular.
//@access         Private
router.post("/sendCarData", asyncMidleware(async(req, res) => {

    const { error } = validateCar(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }



    const car = {
        user_company: req.body.user_company,
        user_transmission: req.body.user_transmission,
        user_assembly: req.body.user_assembly,
        user_color: req.body.user_color,
        user_ecapacity: req.body.user_ecapacity,
        user_etype: req.body.user_etype,
        user_mname: req.body.user_mname,
        user_myear: req.body.user_myear,
        user_mileage: req.body.user_mileage,
        user_regcity: req.body.user_regcity,
        user_cruisecontrol: req.body.user_cruisecontrol,
        user_airbags: req.body.user_airbags,
        user_airconditioning: req.body.user_airconditioning,
        user_alloyrims: req.body.user_alloyrims,
        user_powerlocks: req.body.user_powerlocks,
        user_powersteering: req.body.user_powersteering,
        user_powerwindows: req.body.user_powerwindows,
        user_sunroof: req.body.user_sunroof,
        user_powermirrors: req.body.user_powermirrors,
        user_immobilizerkey: req.body.user_immobilizerkey,
        user_abs: req.body.user_abs,

    };


    await Car.create(car);
    console.log("Car added");

    spawn('python', ['project.py']);




}));


router.get("/getdata", asyncMidleware(async(req, res) => {
    const car = await Car.find().sort({ _id: -1 }).limit(1);

    function checkBoolean(value) {
        if (value === true) {
            return 1.0;
        } else {
            return 0.0;
        }
    }

    user_company = car[0].user_company;
    user_transmission = car[0].user_transmission;
    user_assembly = car[0].user_assembly;
    user_color = car[0].user_color;
    user_ecapacity = car[0].user_ecapacity;
    user_etype = car[0].user_etype;
    user_mname = car[0].user_mname;
    user_myear = car[0].user_myear;
    user_mileage = car[0].user_mileage
    user_regcity = car[0].user_regcity
    user_cruisecontrol = checkBoolean(car[0].user_cruisecontrol);
    user_airbags = checkBoolean(car[0].user_airbags)
    user_airconditioning = checkBoolean(car[0].user_airconditioning)
    user_alloyrims = checkBoolean(car[0].user_alloyrims)
    user_powerlocks = checkBoolean(car[0].user_powerlocks)
    user_powersteering = checkBoolean(car[0].user_powersteering)
    user_powerwindows = checkBoolean(car[0].user_powerwindows)
    user_sunroof = checkBoolean(car[0].user_sunroof)
    user_powermirrors = checkBoolean(car[0].user_powermirrors)
    user_immobilizerkey = checkBoolean(car[0].user_immobilizerkey)
    user_abs = checkBoolean(car[0].user_abs)

    res.json({
        userCompany: user_company,
        userTransmission: user_transmission,
        userAssembly: user_assembly,
        userColor: user_color,
        userEcapacity: user_ecapacity,
        userEtype: user_etype,
        userMname: user_mname,
        userMyear: user_myear,
        userMileage: user_mileage,
        userRegcity: user_regcity,
        userCruisecontrol: user_cruisecontrol,
        userAirbags: user_airbags,
        userAirConditiong: user_airconditioning,
        userAlloyrims: user_alloyrims,
        userPowerlocks: user_powerlocks,
        userPowerSteering: user_powersteering,
        userPowerWindows: user_powerwindows,
        userSunroof: user_sunroof,
        userPowerMirrors: user_powermirrors,
        userImmobilizerkey: user_immobilizerkey,
        userAbs: user_abs
    });

}));




router.post("/postdata", asyncMidleware((req, res) => {
    console.log(`The Price is between ${req.body.price} and ${req.body.price + 200000}`);
    return req.body.price;
}));

router.get("/getPrice", asyncMidleware((req, res) => {

    res.status(200).json({ price: global.price });


}));
















module.exports = router;