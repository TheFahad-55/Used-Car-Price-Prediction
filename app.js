const express = require('express');

const app = express();

let value;




const morgan = require('morgan');

const helmet = require('helmet');

const xss = require("xss-clean");

const cors = require('cors');

const hpp = require('hpp');

const mongoSanitize = require("express-mongo-sanitize");

const colors = require('colors');

const error = require('./middleware/error');

const pythonRoutes = require('./routes/python');

const userRoutes = require('./routes/users');

const authRoutes = require('./routes/auth');

const reviewRoutes = require('./routes/reviews');

const adminRoutes = require('./routes/admin');

const dataRoutes = require('./routes/data');

require('./utilities/unhandle');

//APPLICATION CONFIGURATION.....
require('dotenv').config({ path: './config/.env' })

//Database Connection...
require('./config/db')();

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






app.use('/python', pythonRoutes);
app.use(dataRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use((req, res) => {
    res.status(404).send("Endpoint Not Found");

});





//Error Middleware........
app.use(error);



const port = process.env.PORT || 5000;



app.listen(port, () => console.log(`Server  listening on port ${port}!`.yellow));