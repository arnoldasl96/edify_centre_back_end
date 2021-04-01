const mongoose = require('mongoose');


const CourseSchema = mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    responsible_teachers: [{

    }],
    students_list: [{

    }],
    files: [{}],
    lessons: [{
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        attendance_date: {
            type: Date,
            required: true,
        },
        teachers: [{

        }],
        attended_students: [{

        }],
        files: [{}],
        status: {

            //status published, unlisted, deleted etc..
            type: String,
            required: true,
        }
    }],
    course_created: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Course', CourseSchema);