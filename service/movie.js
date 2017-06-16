'use strict';
const mongoose   = require('mongoose');
const Movie      = mongoose.model('Movies');
const utils = require('../utils/utils');

module.exports.allMovies = async () => {
    return await Movie.find({}, (err, result) => {
        if(err) return err;
        return result;
    });
};

module.exports.newMovie = async (rawData) => {
    const movie = new Movie(rawData);
    try {
        return await movie.save(() => movie);
    } catch(err) {
        return utils.validateModel(err);
    }
}