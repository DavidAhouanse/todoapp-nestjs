import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
const { combine, errors, timestamp, printf, prettyPrint } = winston.format;

@Injectable()
export class LoggerService {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: combine(
        errors({ stack: true }),
        timestamp(),
        printf((info) => `${info.timestamp} ${info.level} : ${info.message}`),
        prettyPrint(),
        // json(),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'log/test.log' }),
      ],
    });
  }

  info(message) {
    this.logger.info(message);
  }

  warn(message) {
    this.logger.warn(message);
  }

  error(message) {
    this.logger.warn(message);
  }

  verbose(message) {
    this.logger.verbose(message);
  }
}
