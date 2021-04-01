const PORT = process.env.PORT || 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
app.use(bodyParser.json());
app.use(cors());


try {
    mongoose.connect(process.env.DB_CONNECTION, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }, () =>
        console.log("connected"));
} catch (error) {
    console.log("could not connect");
}

const authRoute = require('./routes/auth')

app.use(express.json());
app.use('/user', authRoute)

app.listen(PORT, () => {
    console.log("listening on port:", PORT)
});