import { article, category } from '@prisma/client'
import { Transform } from 'class-transformer'
import dayjs from 'dayjs'

export default class Article {
  category: category
  //序列化类的日期使用dayjs进行格式化
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD'))
  createdAt: Date
  @Transform(({ value }) => dayjs(value).format('YYYY-MM-DD'))
  updatedAt: Date
  //构造函数用于传递序列化类数据
  constructor(options: Partial<article> = {}) {
    Object.assign(this, options)
  }
}
