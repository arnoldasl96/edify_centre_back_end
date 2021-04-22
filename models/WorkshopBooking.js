const mongoose = require('mongoose');

const WorkshopBookingSchema = mongoose.Schema({
    workshop: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Workshop"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    status: {
        type: String,
        required: true,
        default: 'pending',
    },
    request_send: {
        type: Date,
        default: Date.now,
    }

})
module.exports = mongoose.model('WorkshopBookingSchema', WorkshopBookingSchema);