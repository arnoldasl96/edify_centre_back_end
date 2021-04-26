const Joi = require("joi");
const jwt = require("jsonwebtoken");

const LoginValidation = (logingUser) => {
  const Schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
  });
  return Schema.validate(logingUser);
};

const RegisterValidation = (newUser) => {
  const Schema = Joi.object().keys({
    role: Joi.string().required(),
    permitions: Joi.object(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(6).required(),
    confirm_password: Joi.string().min(6).required(),
  });

  return Schema.validate(newUser);
};

function generateAccessToken(user) {
  return jwt.sign({ user: user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

function generateRefreshToken(user) {
  return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET);
}
const isLoggedIn = (req, res, next) => {
  const authHeader = req.header["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "access denided" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.status(403).json({ message: "token is invalid" });
    req.user = user;
    next();
  });
};
const isAdministrator = (req, res, next) => {
  const authHeader = req.header["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "access denided" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.status(403).json("token is invalid");
    if (user.role != "admin") {
      return res
        .status(403)
        .json({ message: "access denided - you don't have permition!" });
    }
    req.user = user;
    next();
  });
};

function FormatDate(varDate) {
  let date_ob = new Date(varDate);
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();
  // current minutes
  let minutes = date_ob.getMinutes();
  return year + "-" + month + "-" + date + " " + hours + ":" + minutes;
}

module.exports.RegisterValidation = RegisterValidation;
module.exports.LoginValidation = LoginValidation;
module.exports.generateAccessToken = generateAccessToken;
module.exports.generateRefreshToken = generateRefreshToken;
module.exports.isLoggedIn = isLoggedIn;
module.exports.isAdministrator = isAdministrator;
module.exports.FormatDate = FormatDate;
