const express = require('express');

const router = express.Router();

const asyncMidleware = require('../middleware/async').asyncMiddleware;

router.get("/getdata", asyncMidleware((req, res) => {
    const user_company = "Nissan"
    const user_transmission = "Automatic"
    const user_assembly = "Imported"
    const user_color = "White"
    const user_ecapacity = "660 cc"
    const user_etype = "Petrol"
    const user_mname = "Dayz X"
    const user_myear = 2014
    const user_mileage = 77000
    const user_regcity = "Lahore"
    const user_cruisecontrol = 0
    const user_airbags = 1
    const user_airconditioning = 1
    const user_alloyrims = 1
    const user_powerlocks = 1
    const user_powersteering = 1
    const user_powerwindows = 1
    const user_sunroof = 0
    const user_powermirrors = 1
    const user_immobilizerkey = 1
    const user_abs = 1

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
    console.log(`The Price is between ${req.body.price} and ${req.body.price+200000}`);
}));


















module.exports = router;