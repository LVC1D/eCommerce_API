const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const {Pool} = require('pg');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = require('express').Router();

app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: 'nfdjd8vef(3fjv',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false, httpOnly: false, maxAge: 3600000, sameSite: 'strict'}
})); 

app.use(passport.initialize());
app.use(passport.session());



app.listen(port, () => {    
    console.log(`Server is running on port ${port}`);
});