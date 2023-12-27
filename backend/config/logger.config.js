import { createLogger, format, transports } from 'winston';
const enumerateErroFormat = format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});
const logger = createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: format.combine(
    enumerateErroFormat(),
    process.env.NODE_ENV === 'development'
      ? format.colorize()
      : format.uncolorize(),
    format.splat(),
    format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new transports.Console({
      stderrLevels: ['error'],
    }),
    // new transports.File({
    //   filename: 'error.log',
    //   level: 'error',
    // }),
    // new transports.File({
    //   filename: 'logs.log',
    //   level: 'info',
    // }),
  ],
});

export default logger;
