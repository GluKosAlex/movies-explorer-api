import { Router } from 'express';

import { getCurrentUser, updateUserInfo } from '../controllers/users.js';
import userInfoValidate from '../middlewares/userInfoValidate.js';

const usersRouter = new Router();

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', userInfoValidate, updateUserInfo);

export default usersRouter;
