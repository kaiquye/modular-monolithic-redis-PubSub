import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Result } from '../error/custom-error';

export interface Response<T> {
  data: T;
}

@Injectable()
export class InterceptorResponse implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<Result<any>>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data: Result<any>) => {
        response.status = data.httpStatusCode;
        return {
          error: false,
          timestamp: new Date().toISOString(),
          data: data.data,
        };
      }),
    );
  }
}
