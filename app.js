const express = require('express');

const app = express();

let value;

const { spawn } = require('child_process');

const morgan = require('morgan');

const helmet = require('helmet');

const xss = require("xss-clean");

const cors = require('cors');

const hpp = require('hpp');

const mongoSanitize = require("express-mongo-sanitize");

const colors = require('colors');

const error = require('./middleware/error');

const pythonRoutes = require('./routes/python');

require('./utilities/unhandle');

//APPLICATION CONFIGURATION.....
require('dotenv').config({ path: './config/.env' })

//Body Parsing.....

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//SET SECURITY HEADERS.......

app.use(helmet());

//PREVENT XROSS SIDE SCRIPTING.....
app.use(xss())

//CROSS SITE RESOURCE SHARING....
app.use(cors());

//PREVENT SQL NOSQL INJECTION........
app.use(mongoSanitize());

//PREVENT HTTP PARAMS POLLUTION.....
app.use(hpp());

//Morgan 
app.use(morgan('dev'));

//ROUTES.......
app.use(pythonRoutes);



spawn('python', ['project.py']);


//Error Middleware........
app.use(error);



const port = process.env.PORT || 5000;



app.listen(port, () => console.log(`Server  listening on port ${port}!`.yellow));