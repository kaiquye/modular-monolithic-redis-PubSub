import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { Result } from '../error/custom-error';

@Catch(Result)
export class ResultExceptionFilter implements ExceptionFilter {
  catch(exception: Result<any>, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.httpStatusCode;
    const error = exception.message;
    const code = exception.code;
    const message = exception.error;

    response.status(status).json({
      error: error,
      code: code,
      message: message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
