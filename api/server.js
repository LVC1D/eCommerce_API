const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
const {Pool} = require('pg');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = require('express').Router();
const store = new session.MemoryStore();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'nfdjd8vef(3fjv',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false, httpOnly: false, maxAge: 3600000, sameSite: 'strict'},
    store: store
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

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    pool.query('SELECT * FROM users WHERE id = $1', [id], (err, res) => {
        done(err, res.rows[0]);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    }, (email, password, done) => {

    if (err) {
        return done(err);
    }
    if (!res.rows[0]) {
        return done(null, false, {message: 'Incorrect email'});
    }
   
}));

app.post('/register', async (req, res) => {
    const {email, password} = req.body;
    const id = {id: pool.query('SELECT MAX(id) FROM users')};
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt, (err, hash) => {
            pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hash], (err, result) => {
                res.send('User created');
            });
        });
        const user = {...id, email, password: hashedPassword};
        await pool.user.push(user);
        req.login(user, (err) => {
            res.send('User created');
        });
    } catch {
        res.status(500).json({ message: err.message });
    }
});

app.post('/login', passport.authenticate('local'), (req, res) => {
    const {email, password} = req.body;
    try {
        pool.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
            if (err) {
                res.status(500).json({ message: err.message });
            }
            if (result.rows[0]) {
                bcrypt.compare(password, result.rows[0].password, (err, result) => {
                    if (result) {
                        res.send('Logged in');
                        return res.render('/profile', {email: email});
                    } else {
                        res.send('Incorrect password');
                        return res.redirect('/login');
                    }
                });
            } else {
                res.send('Incorrect email');
            }
        });
    } catch {
        res.status(500).json({ message: err.message });
    }
    res.send('Logged in');
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/profile", (req, res) => {
    res.render("profile");
});

app.listen(port, () => {    
    console.log(`Server is running on port ${port}`);
});