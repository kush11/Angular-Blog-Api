const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let loggerSchema = new Schema(
    {
        remoteIpAddress: {
            type: String
        },
        originalUrl: {
            type: String,
        },
        method: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        },        
    }
)

module.exports = mongoose.model('ApiLogger', loggerSchema);