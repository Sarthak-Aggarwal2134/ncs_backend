const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const Log = require('./src/middleware/logger');
const PORT = process.env.PORT || 4000;
const MONGO_DB_URI = process.env.MONGO_DB_URI ||
    'mongodb+srv://ncs:ncs@dfs.9kunhso.mongodb.net/?retryWrites=true&w=majority';
const jsonParser = bodyParser.json();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(MONGO_DB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB database connection established successfully !")
    })
    .catch((err) => console.log(err));

app.get('/', jsonParser, (req, res) => {
    res.send('Hello World!');
});

const api = require('./src/api/v1/routes');

app.use('/api/v1', api);

app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
});

module.exports = app;