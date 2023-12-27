import { Router } from 'express';
import { register } from '../controllers/auth.controller.js';
import { all as trimAll } from 'trim-request';
const authRouter = new Router();

// Add routes
authRouter.post('/register', trimAll, register);
// authRouter.post('/', SessionController.store);
// authRouter.put('/', SessionController.store);
// authRouter.delete('/', SessionController.store);

export default authRouter;
