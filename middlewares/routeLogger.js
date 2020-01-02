// types of middleware
// 1) Application Level middleware
// 2) Router level middleware
// 3) Error handling middleware
// 4) Build-in middleware
// 5) Third party middleware

const appConfig = require('../config/appConfig');
const loggerMode = require('../models/loggerModel');
let logIp = (req, res, next) => {
    var todayDate = Date.now()
    let remoteIp = req.connection.remoteAddress + '://' + req.connection.remotePort;
    let realIp = req.headers['X-REAL-IP'];
    console.log(req.method + 'Request Made from ' + remoteIp + 'from route' + req.originalUrl);

    let newLoggerData = new loggerMode({
        remoteIpAddress: remoteIp,
        originalUrl: req.originalUrl,
        method: req.method
    });
    newLoggerData.save((err, result) => {
        if (err) {
            console.warn(err);
        }
        else {
            console.log(result)
        }
    })
    if (req.method === 'OPTIONS') {
        console.log('!option');
        var headers = {};
        headers['Access-Control-Allow-Origin'] = "*";
        headers['Access-Control-Allow-Methods'] = "POST,GET,PUT,DELETE,OPTIONS";
        headers['Access-Control-Allow-Credentials'] = false;
        headers['Access-Control-Max-Age'] = "86400" // 34 Hours;
        headers['Access-Control-Allow-Headers'] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
        res.writeHead(200, headers);
        res.end();
    }
    else {
        req.header('Access-Control-Allow-Origin', appConfig.allowedCorsOrigin)
        req.header('Access-Control-Allow-Headers', 'POST,GET,PUT,DELETE,OPTIONS');
        req.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        next();
    }

}
module.exports = {
    logIp
}