const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssignmentSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength: 2,
    },
    description:{
        type:String,
        required: true,
        minlength:2,
    },
    time_to_attend:{
        type: Date,
        required:true,
    },
    teachers: [{
        type:Schema.Types.ObjectId,
        ref:'User',
    }],
    students: [{ 
        type:Schema.Types.ObjectId,
        ref:'User',
    }],
    grades:[{
        grade:{type:Number,
            min:1,
            max:10,
            default: undefined,
        },
        student_id:String,
    }]
});
module.exports = mongoose.model('Assignment', AssignmentSchema);