import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import fileUpload from 'express-fileupload';
import createHttpErrors from 'http-errors';
import { corsOptions } from '../config/cors.config.js';
import { env } from '../modules/helper.js';
import logger from '../config/logger.config.js';
import routes from '../routes/routes.js';
import { mongodbConnect } from '../database/database.js';

export default class App {
  constructor() {
    this.serverInit();
    if (process.env.NODE_ENV !== 'production') {
      this.loadDevPlugins();
    }
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
  loadDevPlugins() {
    this.app.use(morgan('dev'));
  }
  loadPlugins() {
    this.app.use(express.json());
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(mongoSanitize());
    this.app.use(cookieParser());
    this.app.use(compression());
    this.app.use(
      fileUpload({
        useTempFiles: true,
      })
    );
  }
  loadExceptionMiddlewares() {
    this.app.use((req, res, next) => {
      next(createHttpErrors.NotFound('This Route Does Not Exists'));
    });
    this.app.use(async (err, req, res, next) => {
      res.status(err.status || 500);
      return res.json({
        error: {
          status: err.status || 500,
          message: err.message,
        },
      });
    });
  }
  loadRoutes() {
    this.app.use('/api/v1', routes);
  }
  startServer() {
    this.server.listen(this.PORT, () => {
      logger.info(process.env.NODE_ENV);

      logger.info(`[Server]: Running On http://localhost:${this.PORT}`);
      logger.info(`[process]: PID -> ${process.pid}`);
    });
  }
}
