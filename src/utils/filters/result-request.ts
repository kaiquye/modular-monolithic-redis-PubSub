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
    const error = exception.error;
    const errorReference = exception.errorReference;
    const message = exception.message;

    const json = {
      error: error,
      timestamp: new Date().toISOString(),
      path: request.url,
      details: {
        errorReference: errorReference,
        message: message,
      },
    };
    response.status(status).json(json);
  }
}
