var express = require('express');
var router = express.Router();
const cryptoJS = require("crypto-js");
const {
  v1: uuid1,
  v4: uuid4,
} = require('uuid');

const DB = require('./../database/connection.js');
const hashLength = 64;

router.get('/login', function(req, res) {
  const uid = req.cookies.uid;
  const username = req.cookies.username;
  if (uid || username) {
    res.redirect('/');
  }

  res.render('auth/login');
});

router.post('/login', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const user = await DB.user.findByName(username);
  if (!user) {
    res.status(404).send("Tài khoản không tồn tại!");
    return;
  }
  const userPassword = user.password;
  const salt = userPassword.slice(hashLength);
  const pwSalt = password + salt;
  const pwHashed = cryptoJS.SHA3(pwSalt, {outputLength: hashLength * 4}).toString(cryptoJS.enc.Hex);
  if (userPassword != (pwHashed + salt)) {
    res.status(404).send("Sai mật khẩu!");
    return;
  }

  res.cookie('uid', user.id);
  res.cookie('username', user.name);
  req.session.uid = user.id;
  req.session.username = user.name;
  req.session.loggedIn = true;
  req.session.user = user;
  req.session.role = user.role;
  res.locals.loggedIn = true;

  const role = await DB.user.role(user.role);
  req.session.roleName = role.name;
  console.log("login: ", res.locals.loggedIn);

  res.redirect('/');
});

router.get('/signup', function(req, res) {
  const uid = req.cookies.uid;
  const username = req.cookies.username;
  if (uid || username) {
    res.redirect('/');
  }

  res.render('auth/signup');
});

router.post('/signup', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const phone = req.body.phone;
  const email = req.body.email;
  const nationality = req.body.nationality;
  const avatar = "";
  const role = req.body.role;

  const testUser = await DB.user.findByName(username);
  if (testUser) {
    console.log("Existed username");
    res.status(404).send("Tài khoản đã tồn tại");
    return;
  }

  const salt = Date.now().toString(16);
  const passwordSalt = password + salt;
  const pwHashed = cryptoJS.SHA3(passwordSalt, {outputLength: hashLength * 4})
    .toString(cryptoJS.enc.Hex);
  const user = {
    uid: uuid4(),
    name: username,
    password: pwHashed + salt,
    phone: phone,
    email: email,
    nationality: nationality,
    avatar: avatar,
    role: role
  };
  const newUser = await DB.user.add(user);
  res.redirect('/auth/login');
});

router.get('/logout', function (req, res) {
  delete req.session.uid;
  delete req.session.username;
  delete req.session.loggedIn;
  delete req.session.user;
  delete req.session.role;
  res.clearCookie('uid');
  res.clearCookie('username');
  res.locals.loggedIn = false;

  res.redirect("/auth/login");
})

module.exports = router;
