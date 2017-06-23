'use strict';
const {send, json}        = require('micro');
const {router, get, post} = require('microrouter');
const rateLimit           = require('micro-ratelimit');
const cors                = require('micro-cors')();
const database            = require('../../database/db');
const model               = require('../../model/index');
const controller          = require('../../controller/index');

// GENERAL
const hello = rateLimit({window: 5000, limit: 2}, (req, res) => {
    send(res, 200, `Hello, ${req.params.who}`);
});

const testPost = async (req, res) => {
    const data = await json(req);
    console.log('testPost');
    send(res, 201, {data});
};

const notFound = (req, res) => {
    console.log('NOT FOUND.')
    send(res, 404, 'Endpoint not found');
};

// MOVIES
const movies = async (req, res) => {
    const movies = await controller.movie.allMovies();
    send(res, 200, movies);
};

const movieById = async (req, res) => {
    const movieId = await req.params.id;
    const movie = await controller.movie.movieById(movieId);
    send(res, 200, movie);
}

const newMovie = async (req, res) => {
    const rawMovie = await json(req);
    const movie = await controller.movie.newMovie(rawMovie);
    send(res, 201, movie);
};

module.exports = router(
    get('/hello/:who', cors(hello)),
    get('/movies', cors(movies)),
    get('/movies/:id', cors(movieById)),
    get('/*', notFound),
    post('/movies', cors(newMovie)),
    post('/test-post', cors(testPost))
);