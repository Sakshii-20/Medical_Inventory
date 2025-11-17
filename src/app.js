require('dotenv').config()

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');

// Routes
const userRoutes = require('./routes/user');
const medicineRoutes = require('./routes/medicine');
const supplierRoutes = require('./routes/supplier');
const customerRoutes = require('./routes/customer');
const saleRoutes = require('./routes/sale');

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', userRoutes);
app.use('/', medicineRoutes);
app.use('/', supplierRoutes);
app.use('/', customerRoutes);
app.use('/', saleRoutes);

module.exports = app;
