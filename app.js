const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const dashboardRoutes = require('./routes/dashboard');
const serviceRoutes = require('./routes/service');
const menuRoutes = require('./routes/menu');
const maintenanceRoutes = require('./routes/maintenance');

const app = express();

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/v1/', dashboardRoutes);
app.use('/api/v1/', serviceRoutes);
app.use('/api/v1/', menuRoutes);
app.use('/api/v1/', maintenanceRoutes);

mongoose.connect('mongodb://localhost:27017/service-db',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('You are connected to service-db!')
        app.listen(3000);
    })
    .catch((error) => {
        console.log('Connection to service-db failed', error)
    });

