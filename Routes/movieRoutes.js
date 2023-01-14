const express = require('express');

const movieController = require('../Controller/movieController');
const userController = require('../Controller/userController')
const { verifyToken } = userController;
const { createMovie, getAllMovies, updateMovie, deleteMovie } = movieController;

const router = express.Router();

router.route('/').get(verifyToken, getAllMovies).post(verifyToken, createMovie);
router.route('/:id').patch(verifyToken, updateMovie).delete(verifyToken, deleteMovie);

module.exports = router;