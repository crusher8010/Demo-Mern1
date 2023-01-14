const Movies = require('../models/movieModel');
const jwt = require('jsonwebtoken');
let key = 'Fantastic';

exports.createMovie = async (req, res) => {
    try {

        jwt.verify(req.token, key, async (err, data) => {
            if (err) {
                res.status(400).json({
                    status: "fail",
                    message: "Invalid token"
                })
            } else {
                // console.log(req.body);
                const newMovie = await Movies.create(req.body);

                res.status(201).json({
                    status: "success",
                    data: {
                        newMovie
                    }
                })
            }
        })


    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

exports.getAllMovies = async (req, res) => {
    try {

        jwt.verify(req.token, key, async (err, data) => {
            if (err) {
                res.status(400).json({
                    status: "fail",
                    message: "Invalid token"
                })
            } else {
                // console.log(req.body);
                const movies = await Movies.find();

                res.status(201).json({
                    status: "success",
                    data: {
                        Movies: movies,
                    }
                })
            }
        })


    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

exports.updateMovie = async (req, res) => {
    try {
        jwt.verify(req.token, key, async (err, data) => {
            if (err) {
                res.status(400).json({
                    status: "fail",
                    message: "Invalid token"
                })
            } else {
                if (data.userDetails.role === 'admin') {
                    let movie = await Movies.findByIdAndUpdate(req.params.id, req.body, {
                        new: true,
                        runValidators: true,

                    });
                    console.log(movie);

                    res.status(200).json({
                        status: "success",
                        data: {
                            movie
                        }
                    })
                } else {
                    res.status(400).json({
                        status: "fail",
                        message: "Not enough qualification"
                    })
                }
            }
        })

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}

exports.deleteMovie = async (req, res) => {
    try {
        jwt.verify(req.token, key, async (err, data) => {
            if (err) {
                res.status(400).json({
                    status: "fail",
                    message: "Invalid token"
                })
            } else {
                if (data.userDetails.role === 'admin') {
                    await Movies.findByIdAndDelete(req.params.id);

                    res.status(200).json({
                        status: "success",
                        message: "Deleted Successfully"
                    })
                } else {
                    res.status(400).json({
                        status: "fail",
                        message: "Not enough qualification"
                    })
                }
            }
        })

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        })
    }
}