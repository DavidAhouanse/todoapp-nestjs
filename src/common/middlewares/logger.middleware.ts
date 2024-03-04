import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// import { WinstonModule } from 'nest-winston';
// import * as winston from 'winston';
// const { combine, errors, timestamp, prettyPrint } = winston.format;
import { LoggerService } from '../services/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body, ip } = req;

    res.on('finish', () => {
      const { statusCode } = res;
      const userAgent = req.headers['user-agent'];

      const message = {
        'Request - Method': method,
        URL: originalUrl,
        'Request Body': body,
        'Response - Status Code': statusCode,
        'User Agent': userAgent,
        'Client IP Address': ip,
      };
      this.logger.info(message);
    });
    next();
  }
}
