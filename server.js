//const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const crypto = require('crypto');
const startDb = require('./src/config/db.config');
const profileController = require('./controllers/Profile.controller');
const PORT = 2000;
startDb();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.get('/', profileController.getApp);

app.post('/Profiles', profileController.postProfiles);

app.get('/Profiles', profileController.getProfiles);

app.get('/Profiles/:ProfileID', profileController.getProfile)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
})
