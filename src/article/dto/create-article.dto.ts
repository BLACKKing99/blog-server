import { IsNotEmpty } from 'class-validator'

export class CreateArticleDto {
  @IsNotEmpty({
    message: '内容不能为空'
  })
  content: string
  @IsNotEmpty({
    message: '标题不能为空'
  })
  title: string
  @IsNotEmpty({
    message: '请选择分类'
  })
  categoryId: never
  tips: string
  order: number
}
