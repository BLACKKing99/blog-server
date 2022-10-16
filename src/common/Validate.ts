import { HttpException, HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common'

// 处理dto验证返回的信息
export default class Validate extends ValidationPipe {
  // eslint-disable-next-line prettier/prettier
    protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {
    const error = validationErrors.map((item) => {
      return {
        [item.property]: Object.values(item.constraints)[0]
      }
    })
    const _error = {
      data: error,
      code: 400
    }
    throw new HttpException(_error, HttpStatus.BAD_REQUEST)
  }
}
