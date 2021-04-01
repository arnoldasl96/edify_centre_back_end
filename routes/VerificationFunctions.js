const Joi = require('joi');
const jwt = require('jsonwebtoken');

const LoginValidation = (logingUser) => {
    const Schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
    });
    return Schema.validate(logingUser);
}

const RegisterValidation = (newUser) => {
    const Schema = Joi.object().keys({
        role: Joi.string().required(),
        permitions: Joi.object(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required(),
    });

    return Schema.validate(newUser);

}


function generateAccessToken(user) {
    return jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

function generateRefreshToken(user) {
    return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET);
}
const isLoggedIn = (req, res, next) => {
    const authHeader = req.header['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).send({ message: "access denided" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) return res.status(403).send("token is invalid");
        req.user = user;
        next();
    })
}
const isAdministrator = (req, res, next) => {
    const authHeader = req.header['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).send({ message: "access denided" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) return res.status(403).send("token is invalid");
        if (user.role != "admin") {
            return res.status(403).json({ message: "access denided - you don't have permition!" })
        }
        req.user = user;
        next();
    })
}


module.exports.RegisterValidation = RegisterValidation;
module.exports.LoginValidation = LoginValidation;
module.exports.generateAccessToken = generateAccessToken;
module.exports.generateRefreshToken = generateRefreshToken;
module.exports.isLoggedIn = isLoggedIn;
module.exports.isAdministrator = isAdministrator;