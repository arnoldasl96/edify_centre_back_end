const PORT = process.env.PORT || 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(express.json({ limit: '50mb', extended: true }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(cors());
app.use('/uploads', express.static('uploads'))

try {
    mongoose.connect(process.env.DB_CONNECTION, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false }, () =>
        console.log("connected"));
} catch (error) {
    console.log("could not connect");
}

const authRoute = require('./routes/auth')
const usersRoute = require('./routes/user')
const workshopRoute = require('./routes/workshop')
const filesRoute = require('./routes/files')
const sessionRoute = require('./routes/session')
const bookingRoute = require('./routes/Booking')

app.use(express.json());
app.use('/user', authRoute)
app.use('/user', usersRoute)
app.use('/workshop', workshopRoute)
app.use('/files', filesRoute)
app.use('/session', sessionRoute)
app.use('/booking', bookingRoute)

app.listen(PORT, () => {
    console.log("listening on port:", PORT)
});