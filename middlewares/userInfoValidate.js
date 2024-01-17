import { Joi, celebrate } from 'celebrate';

export default celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
    })
    .unknown(true),
});
