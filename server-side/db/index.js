const mongoose = require('mongoose');
const chalk = require('chalk');

const mongoURI = process.env.mongoURI;

// CHALK init color
const connected = chalk.white;
const error = chalk.red;
const disconnected = chalk.blue;
const termination = chalk.magenta;

const db = {
    connect: () => {
        mongoose.connection.on('connected', () => {
            console.log(connected("Connection Established"));
        });

        mongoose.connection.on('error', (err) => {
            console.log(error(`Error while establishing connection: ${err}`));
        });

        mongoose.connection.on('disconnected', () => {
            console.log(disconnected("Mongoose default connection is disconnected"));
        });

        process.on('SIGINT', () => {
            mongoose.connection.close(function () {
                console.log(termination("Mongoose default connection is disconnected due to application termination"));
                process.exit(0)
            });
        });

        return mongoose.connect(mongoURI, {useNewUrlParser: true});
    },
    close: () => {
        return mongoose.connection.close()
    }
};

module.exports = db;