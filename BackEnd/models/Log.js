const mongoose = require('mongoose');


const Schema = mongoose.Schema;

var Logs = new Schema({
    type: {
        type: String
    },
    actiondescription: {
        type: String
    },
    responsible: {
        type: String
    },
    date:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Logs', Logs)