const mongoose = require('mongoose');


const Schema = mongoose.Schema;

var Posts = new Schema({
    title: {
        type: String
    },
    description: {
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

module.exports = mongoose.model('Posts', Posts)
