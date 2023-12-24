import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { Router } from 'express';
import { errors } from 'celebrate';

import usersRouter from './users.js';
import moviesRouter from './movies.js';
import { createUser, login } from '../controllers/users.js';
import globalErrorHandler from '../controllers/errors.js';
import userAuthValidate from '../middlewares/userAuthValidate.js';
import auth from '../middlewares/auth.js';
import { requestLogger, errorLogger } from '../middlewares/logger.js';
import CustomError from '../utils/customError.js';

const router = new Router();

router.use(requestLogger);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.post('/signin', userAuthValidate, login);
router.post('/signup', userAuthValidate, createUser);
router.use('*', auth, (req, res, next) => {
  const err = new CustomError(
    `Error: ${StatusCodes.NOT_FOUND} ${req.originalUrl} ${ReasonPhrases.NOT_FOUND}`,
    StatusCodes.NOT_FOUND,
  );
  next(err);
});

router.use(errorLogger);

router.use(errors());
router.use(globalErrorHandler);

export default router;
