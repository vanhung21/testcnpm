require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
//kết nối database 
const mongoData = process.env.DATABASE_URL;
mongoose.connect(mongoData);
const database = mongoose.connection;
// kết nối or error
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

app.use(express.json());

const routes = require('./routes/routes');

app.use('/api',routes);

app.listen(4000, () => {
    console.log(`Server Started at ${4000}`)
})
