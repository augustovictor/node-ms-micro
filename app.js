'use strict';
const {send, json}        = require('micro');
const {router, get, post} = require('microrouter');
const rateLimit           = require('micro-ratelimit');
const mongoose            = require('mongoose');
const model               = require('./model/index');
const controller          = require('./controller/index');

// CONNECTION
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/msdb');

const hello = rateLimit({window: 5000, limit: 2}, (req, res) => {
    send(res, 200, `Hello, ${req.params.who}`);
});

const movies = async (req, res) => {
    const movies = await controller.movie.allMovies();
    send(res, 200, movies);
};

const notFound = (req, res) => {
    send(res, 404, 'Endpoint not found');
};

module.exports = router(
    get('/hello/:who', hello),
    get('/movies', movies),
    get('/*', notFound)
);