const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    account_created: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    permitions: {
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isTeacher: {
            type: Boolean,
            default: false,
        },
        isPsychologist: {
            type: Boolean,
            default: false,
        },
        isStudent: {
            type: Boolean,
            default: true,
        },

    },
    // createdCourseList: {
    //     courseId,
    //     createdAt
    // },
    // purchasedCourseList: {
    //     courseId,
    //     purchasedDate,
    // },


});

module.exports = mongoose.model('User', UserSchema)