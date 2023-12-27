import mongoose from 'mongoose';
// import { createPool, createConnection, createPoolCluster } from 'mysql2';
import { env } from '../modules/helper.js';
import logger from '../config/logger.config.js';

export const mongodbConnect = (server) => {
  mongoose.connect(
    `${env('MONGO_ADDRESS')}:${env('MONGO_PORT')}/${env('MONGO_DATABASE')}`
  );
};
mongoose.connection.on('error', (err) => {
  logger.error(`MongoDb connection error: ${err}`);
});
mongoose.connection.once('open', () => {
  logger.info('Connected MongoDb Successfully');
});
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info(
      'Mongoose connection is disconnected due to application termination'
    );
  });
});
if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true);
}
// export const mysqlPoolConnection = createPool({
//   port: env('MYSQL_PORT'),
//   host: env('MYSQL_HOST'),
//   user: env('MYSQL_USER'),
//   password: env('MYSQL_PASSWORD'),
//   database: env('MYSQL_DATABASE'),
//   waitForConnections: true,
//   connectionLimit: 10,
//   maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
//   idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
//   queueLimit: 0,
//   enableKeepAlive: true,
//   keepAliveInitialDelay: 0,
// }).promise();

// export const mysqlConnection = createConnection({
//   port: env('MYSQL_PORT'),
//   host: env('MYSQL_HOST'),
//   user: env('MYSQL_USER'),
//   password: env('MYSQL_PASSWORD'),
//   database: env('MYSQL_DATABASE'),
// });
