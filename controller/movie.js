'use strict';
const moviesService = require('../service/movie');

exports.allMovies = async () => {
    return await moviesService.allMovies();
};

exports.newMovie = async (rawData) => {
    return await moviesService.newMovie(rawData);
}