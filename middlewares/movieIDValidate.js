import { Joi, celebrate } from 'celebrate';

export default celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().required().length(24),
  }),
});
