const mongoose = require('mongoose');


const WorkshopSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        from: {
            type: Date,
        },
        to: {
            type: Date
        }
    },
    description: {
        type: String,
    },
    files: [{}],
    hours: {
        type: Number,
    },
    price: {
        type: Number,
    },
    short_description: {
        type: String,
    },

    responsible_person: [{

    }],
    sessions: [{

    }],
    status: {
        type: String,
        required: true,
    },
    students_list: [{

    }],
    Workshop_created: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Workshop', WorkshopSchema);