import { PartialType } from '@nestjs/mapped-types'
import { IArticleInfo } from 'src/types'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  collect?: number[] | string
  email?: string
  name?: string
  password?: string
  sex?: number
  bio?: string
  qq?: string
  weixin?: string
  career?: string
  avatar?: string
  id?: never
}
