import App from './app/App.js';
const serverApp = new App();

const exitHandler = () => {
  if (serverApp.server) {
    logger.info('Server closed.');
    process.exit(1);
  } else {
    process.exit(1);
  }
};
const uncaughtErrorException = (error) => {
  logger.error(error);
  exitHandler();
};
process.on('uncaughtException', uncaughtErrorException);
process.on('unhandledRejection', uncaughtErrorException);

process.on('SIGTERM', () => {
  logger.info('Server closed');
  process.exit(1);
});
