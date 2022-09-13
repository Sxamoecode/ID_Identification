const mongoose = require('mongoose');
const express = require('express');
const joi = require('joi');
const app = express();

const startDb = require('./src/config/db.config');
//const { validateSignup } = require('./Validator');
const profileController = require('./controllers/Profile.controller');
const { urlencoded } = require('express');
const PORT = 2000;
startDb();

app.use((req, res, next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.url} ${delta}ms`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false}));


app.post('/Profiles', profileController.postProfiles);

app.get('/Profiles', profileController.getProfiles);

app.get('/Profiles/:ProfileID', profileController.getProfile)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})
