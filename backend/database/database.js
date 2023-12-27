import { connect } from 'mongoose';
import { createPool, createConnection, createPoolCluster } from 'mysql2';
import { env } from '../modules/helper.js';

export const mongodbConnect = (server) => {
  connect(
    `${env('MONGO_ADDRESS')}:${env('MONGO_PORT')}/${env('MONGO_DATABASE')}`
  )
    .then(() => {
      console.info('MongoDb Connected');
    })
    .catch((error) => {
      console.error(error);
      server.close();
      console.log('Unable to connect to Database So Server is closed');
    });
};
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
