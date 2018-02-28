const mongoose = require('mongoose');

var TodoSchema = mongoose.Schema({
    text : {
        type : String,
        minlength : 1,
        required : true,
        trim : true
    },
    completed : {
        type : Boolean,
        default : false,
    },
    completedAt : {
        type : Date,
        default : null
    }
});

var Todo = mongoose.model('Todo',TodoSchema);

module.exports = {Todo};