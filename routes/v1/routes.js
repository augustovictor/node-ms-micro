'use strict';
const { send, json }                  = require('micro');
const { router, get, post, del, put } = require('microrouter');
const rateLimit                       = require('micro-ratelimit');
const cors                            = require('micro-cors')();
const database                        = require('../../database/db');
const model                           = require('../../model/index');
const controller                      = require('../../controller/index');
const { logRequest }                  = require('../../middlewares/mid');

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
    try {
        const movies = await controller.movie.allMovies();
        send(res, 200, movies);
    } catch(err) {
        send(res, 500, {error: err});
    }
};

const movieById = async (req, res) => {
    try {
        const movieId = await req.params.id;
        const movie = await controller.movie.movieById(movieId);
        send(res, 200, movie);
    } catch(err) {
        send(res, 500, {error: err});
    }
};

const updateMovie = async (req, res) => {
    try {
        const movie = await json(req);
        const updatedMovie = await controller.movie.updateMovie(movie);
        console.log(updatedMovie);
        send(res, 200, updatedMovie);
    } catch(err) {
        send(res, 500, {error: err});
    }
}

const newMovie = async (req, res) => {
    try {
        const rawMovie = await json(req);
        const movie = await controller.movie.newMovie(rawMovie);
        send(res, 201, movie);
    } catch(err) {
        send(res, 500, {error: err});
    }
};

const delMovie = async (req, res) => {
    try {
        const movieId = await req.params.id;
        const movie = await controller.movie.delMovie(movieId);
        send(res, 200, movie.result);
    } catch(err) {
        console.log(err);
        send(res, 500, {error: err});
    }
};

module.exports = cors(logRequest(router(
    get('/hello/:who', hello),
    post('/test-post', testPost),

    // === MOVIES ===
    // get
    get('/movies', movies),
    get('/movies/:id', movieById),
    get('/*', notFound),

    // post
    post('/movies', newMovie),

    // delete
    del('/movies/:id', delMovie),

    put('/movies', updateMovie)
)));