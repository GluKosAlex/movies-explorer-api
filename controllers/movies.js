import mongoose from 'mongoose';
import { StatusCodes } from 'http-status-codes';
import Movie from '../models/movie.js';
import asyncErrorHandler from '../utils/asyncErrorHandler.js';
import CustomError from '../utils/customError.js';

// Get all movies controller
// eslint-disable-next-line no-unused-vars
const getMovies = asyncErrorHandler((req, res, next) => Movie.find({})
  .populate(['owner'])
  .then((movies) => {
    res.send(movies);
  }));

// Create movie controller
const createMovie = asyncErrorHandler((req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
  } = req.body;
  const { _id } = req.user;

  return Movie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner: _id,
  })
    .save()
    .then((movie) => movie.populate(['owner']))
    .then((movie) => res.status(StatusCodes.CREATED).send(movie))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        return next(
          new CustomError('Переданы некорректные данные при сохранении фильма', StatusCodes.BAD_REQUEST),
        );
      }

      return Promise.reject(error);
    });
});

// Delete movie controller
const deleteMovie = asyncErrorHandler((req, res, next) => {
  const { movieId } = req.params;

  return Movie.findById(movieId)
    .orFail()
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        throw new CustomError('Нельзя удалять фильмы других пользователей', StatusCodes.FORBIDDEN);
      }
      return movie
        .deleteOne(movie)
        .orFail()
        .then(() => res.send({ message: 'Фильм удалён' }));
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new CustomError('Фильм с указанным ID не найден', StatusCodes.NOT_FOUND));
      }

      return Promise.reject(error);
    });
});

export { createMovie, getMovies, deleteMovie };
