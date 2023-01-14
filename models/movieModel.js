const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    ratings: {
        type: Number,
        require: true,
    },
    genre: {
        type: String,
        require: true
    }
});

const Movies = mongoose.model('movies', MovieSchema);

module.exports = Movies;