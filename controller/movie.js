'use strict';
const moviesService = require('../service/moviesService');

exports.allMovies = async (res, send) => {
    return await moviesService.allMovies();
};