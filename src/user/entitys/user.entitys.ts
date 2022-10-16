import { user } from '@prisma/client'
import { Exclude, Transform } from 'class-transformer'
import dayjs from 'dayjs'

export default class User {
  @Exclude()
  password: string
  @Transform(({ value }) => JSON.parse(value))
  collect: string
  //序列化类的日期使用dayjs进行格式化
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD'))
  createdAt: Date
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD'))
  updatedAt: Date
  constructor(partial: Partial<user> = {}) {
    Object.assign(this, partial)
  }
}
