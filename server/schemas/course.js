const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let CourseSchema = new Schema({
    courseid : {
        required : true,
        type : String
    },
    title : {
        required : true,
        type : String
    },
    description : {
        required : true,
        type : String
    },
    courseduration : Number
});


module.exports = mongoose.model('Course',CourseSchema);