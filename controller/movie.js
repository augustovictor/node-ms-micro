'use strict';
const moviesService = require('../service/movieMongo');

exports.allMovies = async () => {
    return await moviesService.allMovies();
};

exports.movieById = async (movieId) => {
    return await moviesService.movieById(movieId);
};

exports.updateMovie = async (movie) => {
    return await moviesService.updateMovie(movie);
}

exports.newMovie = async (rawData) => {
    return await moviesService.newMovie(rawData);
};

exports.delMovie = async (movieId) => {
    return await moviesService.delMovie(movieId);
};