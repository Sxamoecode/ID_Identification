//const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
//const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const rateLimit = require('express-rate-limit')
const startDb = require('./src/config/db.config');
const profileController = require('./controllers/Profile.controller');
const PORT = 2000;
startDb();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser())

/*
app.use(
    session({
        secret: 'any stringoftext',
        resave: true,
        saveUninitialized: true,
    }),
)
app.use(csurf());

app.use(function(req, res, next) {
    const token = req.csurfToken();
    res.cookie('XSRF-TOKEN', token);
    res.locals.csrfToken = token;
    next();
})*/
//const csurfProtection = csurf({cookie: true})

app.get('/', profileController.getApp);

app.post('/Profiles', profileController.postProfiles);

app.get('/Profiles', profileController.getProfiles);

app.get('/search', profileController.searchProfile)

app.delete('/Profiles/:ID', profileController.deleteProfile)

app.post('/Profiles/verify', profileController.verifyProfile)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})
