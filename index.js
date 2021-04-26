const PORT = process.env.PORT || 4000;
const app = require('./app');
const mongoose = require('mongoose');

try {
    mongoose.connect(process.env.DB_CONNECTION, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false }, () =>
        console.log("connected"));
} catch (error) {
    console.log("could not connect");
}

app.listen(PORT, () => {
    console.log("listening on port:", PORT)
});
