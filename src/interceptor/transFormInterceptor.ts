import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common'
import { Request } from 'express'
import { cloneDeep } from 'lodash'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    console.log('拦截器前')
    // eslint-disable-next-line prettier/prettier
    const request = context.switchToHttp().getRequest() as Request
    // 请求完成之前
    const startTime = Date.now()
    return next.handle().pipe(
      map((data) => {
        // 请求完成之后
        const endTime = Date.now()
        new Logger().log(`TIME:${endTime - startTime}\tURL:${request.path}\tMETHOD:${request.method}`)
        if (data && data.user) {
          delete data.user.password
        }
        const _data = {
          code: 0,
          message: '请求成功',
          data
        }
        return _data
      })
    )
  }
}
