import { Joi, celebrate } from 'celebrate';
import { URLExpression } from '../utils/constants.js';

export default celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(new RegExp(URLExpression)),
    trailerLink: Joi.string().required().pattern(new RegExp(URLExpression)),
    thumbnail: Joi.string().required().pattern(new RegExp(URLExpression)),
    movieId: Joi.number().required(), // id of movie from MoviesExplorer
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
