import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Promise<Observable<any>> {

    let req = context.switchToHttp().getRequest();
    let now = Date.now();
    console.log('Request Method:', req.method);

    return next
      .handle()
      .pipe(tap(() => console.log(`After... ${Date.now() - now}ms`)));

    //return null
  }
}