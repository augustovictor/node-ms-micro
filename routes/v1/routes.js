const {send, json}        = require('micro');
const {router, get, post} = require('microrouter');
const rateLimit           = require('micro-ratelimit');
const database            = require('../../database/db');
const model               = require('../../model/index');
const controller          = require('../../controller/index');

// GENERAL
const hello = rateLimit({window: 5000, limit: 2}, (req, res) => {
    send(res, 200, `Hello, ${req.params.who}`);
});

const notFound = (req, res) => {
    send(res, 404, 'Endpoint not found');
};

// MOVIES
const movies = async (req, res) => {
    const movies = await controller.movie.allMovies();
    send(res, 200, movies);
};

module.exports = router(
    get('/hello/:who', hello),
    get('/movies', movies),
    get('/*', notFound)
);