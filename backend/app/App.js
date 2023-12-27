import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import { corsOptions } from '../config/settings.js';
import { mongodbConnect } from '../database/database.js';
import { env } from '../modules/helper.js';
import notFoundMiddleware from '../middlewares/not-found.js';
import mainRouter from '../routes/mainRouter.js';
import errorHandlerMiddleware from '../middlewares/error-handler.js';

export default class App {
  constructor() {
    this.serverInit();
    this.loadPlugins();
    this.loadRoutes();
    this.loadExceptionMiddlewares();
    mongodbConnect(this.server);
    this.startServer();
  }
  serverInit() {
    this.app = express();
    this.server = createServer(this.app);
    this.PORT = env('PORT') || 8000;
  }
  loadPlugins() {
    this.app.use(express.json());
    this.app.use(cors(corsOptions));
  }
  loadExceptionMiddlewares() {
    this.app.use(notFoundMiddleware);
    this.app.use(errorHandlerMiddleware);
  }
  loadRoutes() {
    this.app.use('/', mainRouter);
  }
  startServer() {
    this.server.listen(this.PORT, () => {
      console.info(`[Server]: Running On http://localhost:${this.PORT}`);
    });
  }
}
