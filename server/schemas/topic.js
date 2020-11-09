const mongoose = require('mongoose');

let Schema = mongoose.Schema;


let topicSchema = new Schema({
    topicid : {
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
    courseuid : {
        type: Schema.ObjectId,
        required: true,
        reference: 'Course'
    }
});


module.exports = mongoose.model('Topic',topicSchema);