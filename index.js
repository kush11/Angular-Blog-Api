const express = require('express');
const appConfig = require('./config/appConfig')
const fs = require('fs');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

// adding the middleware
const errorHandlerMiddleware = require('./middlewares/appErrorHandler')
// adding route logger
const routeLoggerMiddleware = require('./middlewares/routeLogger')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(errorHandlerMiddleware.globalErrorHandler)
app.use(routeLoggerMiddleware.logIp)

// bootstrap the model
let modelPath = './models'
fs.readdirSync(modelPath).forEach((file) => {
    if (~file.indexOf('.js')) {
        console.log("including file modles")
        require(modelPath + '/' + file)
    }
})


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

// callling not found route
// it should be placed after the route 
// order or route is important
app.use(errorHandlerMiddleware.notFoundHandler);



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