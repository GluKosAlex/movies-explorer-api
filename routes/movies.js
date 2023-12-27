import { Router } from 'express';

import { createMovie, deleteMovie, getMovies } from '../controllers/movies.js';
import movieIDValidate from '../middlewares/movieIDValidate.js';
import movieInfoValidate from '../middlewares/movieInfoValidate.js';

const moviesRouter = new Router();

moviesRouter.get('/', getMovies);
moviesRouter.post('/', movieInfoValidate, createMovie);
moviesRouter.delete('/:movieId', movieIDValidate, deleteMovie);

export default moviesRouter;
