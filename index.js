const express = require('express');
const appConfig = require('./config/appConfig')
const fs = require('fs');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// bootstrap the routes
let routePath = './routes'
fs.readdirSync(routePath).forEach((file) => {
    if (~file.indexOf('.js')) {
        console.log("including file")
        let route = require(routePath + '/' + file);
        console.log(routePath + '/' + file)
        route.setRouter(app);
    }
});

// bootstrap the model
let modelPath = './models'
fs.readdirSync(modelPath).forEach((file) => {
    if (~file.indexOf('.js')) {
        console.log("including file modles")
        require(modelPath + '/' + file)
    }
})

mongoose.connection.on('error', (error) => {
    console.warn("Connection Error occured")
    console.warn(error)
})

mongoose.connection.on('open', (err) => {
    if (err) {
        console.warn("Error occured")
        console.warn(err)
    }
    else {
        console.info("Database connection Done Sucess")
    }
})

app.listen(appConfig.port, () => {
    console.log(`Server is Running at ${appConfig.port} Port`)
    mongoose.connect(appConfig.db.uri, { useNewUrlParser: true, useUnifiedTopology: true });
});