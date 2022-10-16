import { IsNotEmpty } from 'class-validator'

export class CreateCommentDto {
  content: string
  @IsNotEmpty({
    message: '请告知评论的哪篇文章'
  })
  articleId: number
  pid?: number
  userId: number
}
