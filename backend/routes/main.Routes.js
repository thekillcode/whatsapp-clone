import { Router } from 'express';
import createHttpErrors from 'http-errors';

const mainRouter = new Router();

// Add routes
mainRouter.get('/', (req, res) => {
  return res.json({ message: 'Welcome to Api Server' });
});
// mainRouter.post('/', SessionController.store);
// mainRouter.put('/', SessionController.store);
// mainRouter.delete('/', SessionController.store);

export default mainRouter;
