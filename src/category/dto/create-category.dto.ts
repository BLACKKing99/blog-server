import { IsNotEmpty } from 'class-validator'

export class CreateCategoryDto {
  @IsNotEmpty({
    message: '分类标题不能为空'
  })
  title: string
  tips: string
}
