'use strict';
const mongoose   = require('mongoose');
const {database} = require('./config');
mongoose.Promise = global.Promise;
mongoose.connect(database);

module.exports = mongoose;