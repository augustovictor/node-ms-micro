'use strict';
const mongoose   = require('mongoose');
const Movie      = mongoose.model('Movies');
const utils = require('../utils/utils');

exports.allMovies = async () => {
    return await Movie.find({}, (err, result) => {
        if(err) return err;
        return result;
    });
};

exports.movieById = async (movieId) => {
    return await Movie.find({_id: movieId}, (err, result) => {
        if(err) return err;
        return result;
    });
};

exports.updateMovie = async (movie) => {
    try {
        return await Movie.findOneAndUpdate({_id: movie._id}, movie, {upsert: true, new: true}).exec();
    } catch(err) {
        return err;
    }
};

exports.newMovie = async (rawData) => {
    const movie = new Movie(rawData);
    try {
        return await movie.save(() => movie);
    } catch(err) {
        return utils.validateModel(err);
    }
};

exports.delMovie = async(movieId) => {
    return await Movie.remove({ _id: movieId }, (err, result) => {
        if(err) return err;
        return result;
    });
};