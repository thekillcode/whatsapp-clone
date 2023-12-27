import logger from '../config/logger.config.js';

export default class ErrorHandler {
  constructor() {}
  static unexpextedErrorHandler(server, error) {
    logger.error(error);
    this.exitHandler();
  }
  static exitHandler(server) {
    if (server) {
      logger.info('Server Closed.');
      process.exit(1);
    } else {
      process.exit(1);
    }
  }
}
