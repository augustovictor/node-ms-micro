'use strict';
const mongoose   = require('mongoose');
const Movie      = mongoose.model('Movies');

module.exports.allMovies = async () => {
    return await Movie.find({}, (err, result) => {
        if(err) return err;
        return result;
    });
};

module.exports.newMovie = async (rawData) => {
    const movie = new Movie(rawData);
    return await movie.save(err => {
        if (err) return err;
        return movie;
    });
}