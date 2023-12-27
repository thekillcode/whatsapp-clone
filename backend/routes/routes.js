import { Router } from 'express';
import mainRouter from './main.Routes.js';
import authRouter from './auth.Routes.js';

const routes = new Router();

// Add routes
routes.use('/', mainRouter);
routes.use('/auth', authRouter);
// routes.get('/', SessionController.store);
// routes.post('/', SessionController.store);
// routes.put('/', SessionController.store);
// routes.delete('/', SessionController.store);

export default routes;
