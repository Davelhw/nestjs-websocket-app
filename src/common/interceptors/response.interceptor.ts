// src/interceptors/response.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ServiceResponse } from '../utils/serviceresponse';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Check if the data is already wrapped in ServiceResponse
        if (data instanceof ServiceResponse) {
          return data; // Return as-is if already wrapped
        }
        // Otherwise, wrap in ServiceResponse
        return new ServiceResponse<T>(true, 'Success', 200, data);
      }),
    );
  }
}
