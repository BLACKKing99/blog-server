import { IsNotEmpty } from 'class-validator'

export class CreateUserDto {}

export class CollectTypeDto {
  @IsNotEmpty({
    message: '配置错误'
  })
  articleId: number
  @IsNotEmpty({
    message: '配置错误'
  })
  type: '1' | '2'
}
