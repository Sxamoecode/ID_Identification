const mongoose = require('mongoose');
const express = require('express');
const app = express();
const startDb = require('./src/config/db.config');
const PORT = 2000;
startDb();

app.listen(PORT, () => {
    console.log(`Listening of ${PORT}`);
})