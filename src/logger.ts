/* Globals */
import { format, transports, createLogger } from 'winston';

export const logger = createLogger(
  {
    level: process.env.NODE_ENV === 'dev' ? 'debug' : 'info',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      format.printf(info => `${info.level}: ${info.message} - timestamp: ${info.timestamp}`)
    ),
    transports: [
      new transports.Console({
        level:  process.env.NODE_ENV === 'dev' ? 'debug' : 'info',
        format: format.combine(
          format.colorize(),
          format.printf(info => `${info.level}: ${info.message} - timestamp: ${info.timestamp}`),
        )
      })
    ]
  }
);
