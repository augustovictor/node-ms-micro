'use strict';
const mongoose   = require('mongoose');
const Movie      = mongoose.model('Movies');

module.exports.allMovies = async () => {
    return await Movie.find({}, (err, result) => {
        if(err) return err;
        return result;
    });
};