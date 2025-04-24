import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file'; // Import the daily rotate file transport

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      // Set default log level to 'warn' to only log warnings and errors
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info: winston.Logform.TransformableInfo) => {
          const { timestamp = new Date().toISOString(), level, message } = info;
          return `${String(timestamp)} [${String(level)}]: ${String(message)}`;
        }),
      ),
      transports: [
        // Info Logs
        new winston.transports.DailyRotateFile({
          filename: 'logs/info-%DATE%.log', // Rotated daily, use %DATE% for date
          datePattern: 'YYYY-MM-DD', // File will be named with date
          level: 'info',
          maxSize: '10m', // Limit the size of the log file (10MB)
          maxFiles: '5d', // Retain logs for 5 days
          zippedArchive: true, // Compress archived logs
        }),

        // Warning Logs
        new winston.transports.DailyRotateFile({
          filename: 'logs/warning-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'warn',
          maxSize: '10m', // Limit the size of the log file (10MB)
          maxFiles: '5d', // Retain logs for 5 days
          zippedArchive: true, // Compress archived logs
        }),

        // Error Logs
        new winston.transports.DailyRotateFile({
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'error',
          maxSize: '10m',
          maxFiles: '5d', // Retain logs for 5 days
          zippedArchive: true, // Compress archived logs
        }),

        // Console Logs (Optional)
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
          ),
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message); // Info messages will not be logged due to level set to 'warn'
  }

  error(message: string, trace: string) {
    this.logger.error(`${message} - ${trace}`);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    // Debug messages will not be logged due to level set to 'warn'
    this.logger.debug(message);
  }

  verbose(message: string) {
    // Verbose messages will not be logged due to level set to 'warn'
    this.logger.verbose(message);
  }
}
