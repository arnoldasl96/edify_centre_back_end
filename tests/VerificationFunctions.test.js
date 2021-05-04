const verifyFunc = require("../routes/VerificationFunctions");
const request =require('supertest')
const jwt = require("jsonwebtoken");
require("dotenv").config();
test("login validation", () => {
  const user = {
    email: "something@something.com",
    password: "123456",
  };
  expect(verifyFunc.LoginValidation(user)).toEqual({
    value: { email: "something@something.com", password: "123456" },
  });
});
test("Registration validation", () => {
  const user = {
    email: "something@something.com",
    password: "123456",
    role: "admin",
    permitions: {},
    firstname: "test",
    lastname: "test",
    confirm_password: "123456",
  };
  expect(verifyFunc.RegisterValidation(user)).toEqual({
    value: {
      email: "something@something.com",
      firstname: "test",
      lastname: "test",
      password: "123456",
      permitions: {},
      role: "admin",
      confirm_password: "123456",
    },
  });
});
test("generate Access token test", () => {
  const user = {
    email: "something@something.com",
    password: "123456",
    role: "admin",
    permitions: {},
    firstname: "test",
    lastname: "test",
    confirm_password: "123456",
  };
  const accessToken = verifyFunc.generateAccessToken(user);
  expect(jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET))
  .toEqual(jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET));
});
test("generate Refresh token test", () => {
  const user = {
    email: "something@something.com",
    password: "123456",
    role: "admin",
    permitions: {},
    firstname: "test",
    lastname: "test",
    confirm_password: "123456",
  };
  const accessToken = verifyFunc.generateRefreshToken(user);
  expect(jwt.verify(accessToken,process.env.REFRESH_TOKEN_SECRET))
  .toEqual(jwt.verify(accessToken,process.env.REFRESH_TOKEN_SECRET));
});
test('Format date test', () => {
  const date = new Date(1995, 11, 17, 3, 24, 0);
  expect(verifyFunc.FormatDate(date)).toEqual('1995-12-17 3:24')
})
test('should check if logged in ', async () => {
  const token = verifyFunc.generateAccessToken({email:'something@gmail.com', password: '123456' , role:"admin"})
  expect(token).not.toBe();
//     if (!token) return res.status(401).json({ message: "access denided" });
   
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
//       if (error) return res.status(403).json({ message: "token is invalid" });
//       req.user = user;
//       next();
// })
});
