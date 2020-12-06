async function connectDatabase() {
    try {
        const mongoose = require('mongoose');
        const conn = await mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
        if (conn) {
            console.log(`Connected To The ${conn.connection.host}`.bgMagenta);


        }

    } catch (error) {
        console.log(error.message, error.stack);

    }
}

module.exports = connectDatabase;