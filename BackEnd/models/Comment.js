const mongoose = require('mongoose');


const Schema = mongoose.Schema;

var Comments = new Schema({
    post: {
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

module.exports = mongoose.model('Comments', Comments)