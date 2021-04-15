const router = require('express').Router();
const Users = require('../models/User');
const jwt = require('jsonwebtoken')
const {
    LoginValidation,
    RegisterValidation,
    generateAccessToken,
    generateRefreshToken,
} = require('./VerificationFunctions');
const bcrypt = require('bcryptjs');


router.post('/login', async(req, res) => {
    const { error } = LoginValidation(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const user = await Users.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "Email or password is wrong, try again" });

    const checkPass = await bcrypt.compare(req.body.password, user.password);
    if (!checkPass) return res.status(400).json({ message: 'email or password is wrong, try again' })
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.status(200).json({ message: "success", accessToken: accessToken, refreshToken: refreshToken });
})

router.post('/registration', async(req, res) => {
    const { error } = RegisterValidation(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message});
    }
    if (req.body.password != req.body.confirm_password) {

        return res.status(400).json({ message: 'passwords does not match!' });
    }
    //checking is the user is in DB
    const emailExists = await Users.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).json({message: "Email already exists"});
    }

    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);

    //user creation
    const user = new Users({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email: req.body.email,
        role: req.body.role,
        password: hashedpassword,
        permitions: permitions,
    });
    try {
        const savedUser = await user.save();
        res.json({ user: savedUser });
    } catch (error) {
        res.status(400).json({message: error});
    }
});

module.exports = router;