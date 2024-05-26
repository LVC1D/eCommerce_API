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
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'nfdjd8vef(3fjv',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false, httpOnly: false, maxAge: 3600000, sameSite: 'strict'}
})); 
const pool = new Pool({
    user: "hectorcryo",
    host: "localhost",
    database: "eCommerce",
    password: "604b12bd9F!",
    port: 5432
});

console.log(pool.query('SELECT * FROM users', (err, res) => {
    console.log(err, res);
}));


app.use(passport.initialize());
app.use(passport.session());



app.listen(port, () => {    
    console.log(`Server is running on port ${port}`);
});