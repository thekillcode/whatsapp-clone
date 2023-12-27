import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import fileUpload from 'express-fileupload';
import { corsOptions } from '../config/settings.js';
import { env } from '../modules/helper.js';
import mainRouter from '../routes/mainRouter.js';

export default class App {
  constructor() {
    this.serverInit();
    if (process.env.NODE_ENV !== 'production') {
      this.loadDevPlugins();
    }
    this.loadPlugins();
    this.loadRoutes();
    this.loadExceptionMiddlewares();
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
  loadExceptionMiddlewares() {}
  loadRoutes() {
    this.app.use('/', mainRouter);
  }
  startServer() {
    this.server.listen(this.PORT, () => {
      console.log(process.env.NODE_ENV);
      console.info(`[Server]: Running On http://localhost:${this.PORT}`);
    });
  }
}
