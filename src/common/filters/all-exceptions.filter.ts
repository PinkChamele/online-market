import { Response as ExpressResponse } from 'express';

import {
  ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const res = ctx.getResponse<ExpressResponse>();
    const exceptionMessage: string | null = exception.message || null;
    const exceptionResponse: null = exception.getResponse ? (exception.getResponse()) : null;
    const status: number = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception.code === 11000) {
      return res.status(HttpStatus.CONFLICT).json({
        message: exceptionMessage,
        error: exceptionResponse,
      });
    }

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      Logger.error(exception);
    }

    return res.status(status).json({
      message: exceptionMessage,
      error: exceptionResponse,
    });
  }
}
