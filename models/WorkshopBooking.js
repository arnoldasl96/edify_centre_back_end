const mongoose = require('mongoose');

const WorkshopBookingSchema = mongoose.Schema({
    workshopId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    request_send: {
        type: Date,
        default: Date.now,
    }

})
module.exports = mongoose.model('WorkshopBookingSchema', WorkshopBookingSchema);