const mongoose = require("mongoose");

const Joi = require("joi");

const carSchema = new mongoose.Schema({
  user_company: {
    type: String,
    required: [true, "Please Choose Company Name"],
  },
  user_transmission: {
    type: String,
    required: [true, "Please Choose  Transmission"],
  },
  user_assembly: {
    type: String,
    required: [true, "Please Choose  Assembly"],
  },
  user_color: {
    type: String,
    required: [true, "Please Choose  Color"],
  },
  user_ecapacity: {
    type: String,
    required: [true, "Please Choose  Engine Capacity"],
  },
  user_etype: {
    type: String,
    required: [true, "Please Choose  Engine Type"],
  },
  user_mname: {
    type: String,
    required: [true, "Please Choose  Model Name"],
  },
  user_myear: {
    type: Number,
    required: [true, "Please Choose  Model Year"],
  },
  user_mileage: {
    type: Number,
    required: [true, "Please Enter Car Mileage"],
  },
  user_regcity: {
    type: String,
    required: [true, "Please Choose  Registered City"],
  },
  user_cruisecontrol: {
    type: Boolean,
    required: [true, "Please Choose  Cruise Control"],
  },
  user_airbags: {
    type: Boolean,
    required: [true, "Please Choose  Air Bags"],
  },
  user_airconditioning: {
    type: Boolean,
    required: [true, "Please Choose  AC"],
  },
  user_alloyrims: {
    type: Boolean,
    required: [true, "Please Choose  Alloy Rims"],
  },
  user_powerlocks: {
    type: Boolean,
    required: [true, "Please Choose  Power Locks"],
  },
  user_powersteering: {
    type: Boolean,
    required: [true, "Please Choose  Power Steering"],
  },
  user_powerwindows: {
    type: Boolean,
    required: [true, "Please Choose  Power Windows"],
  },
  user_sunroof: {
    type: Boolean,
    required: [true, "Please Choose  Sunroof"],
  },
  user_powermirrors: {
    type: Boolean,
    required: [true, "Please Choose  Power Mirrors"],
  },
  user_immobilizerkey: {
    type: Boolean,
    required: [true, "Please Choose  ImmobilizerKey"],
  },
  user_abs: {
    type: Boolean,
    required: [true, "Please Choose  ABS Break"],
  },
});

function validateCar(car) {
  const schema = Joi.object({
    user_company: Joi.string().required(),
    user_transmission: Joi.string().required(),
    user_assembly: Joi.string().required(),
    user_color: Joi.string().required(),
    user_ecapacity: Joi.string().required(),
    user_etype: Joi.string().required(),
    user_mname: Joi.string().required(),
    user_myear: Joi.number().required(),

    user_mileage: Joi.number().required(),
    user_regcity: Joi.string().required(),
    user_cruisecontrol: Joi.boolean().required(),
    user_airbags: Joi.boolean().required(),
    user_airconditioning: Joi.boolean().required(),
    user_alloyrims: Joi.boolean().required(),
    user_powerlocks: Joi.boolean().required(),
    user_powersteering: Joi.boolean().required(),
    user_powerwindows: Joi.boolean().required(),

    user_sunroof: Joi.boolean().required(),
    user_powermirrors: Joi.boolean().required(),
    user_immobilizerkey: Joi.boolean().required(),
    user_abs: Joi.boolean().required(),
  });
  const result = schema.validate(car);
  return result;
}

const Car = mongoose.model("Car", carSchema);

module.exports.Car = Car;
module.exports.validateCar = validateCar;
