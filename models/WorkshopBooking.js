const mongoose = require('mongoose');

const WorkshopBookingSchema = mongoose.Schema({
    workshopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Workshop"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User"
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