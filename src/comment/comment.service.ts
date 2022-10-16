import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserService } from 'src/user/user.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService, private readonly userServer: UserService) {}
  async create(createCommentDto: CreateCommentDto, id: number) {
    const data = { ...createCommentDto }
    if (data.pid === undefined) {
      data.pid = 0
    }
    data.userId = id
    await this.prisma.comment.create({
      data
    })
    return '评论成功'
  }

  findAll() {
    return []
  }

  async findOne(articleId: number) {
    const all = await this.prisma.comment.findMany({
      where: {
        articleId
      }
    })
    const data = {} as Record<string, any>
    data.comment = await this.getUser(all, 0)
    data.backComment = await this.getUser(all, 1)
    return data
  }

  async getUser(all: any[], type: 0 | 1) {
    const data = await Promise.all(
      all
        .filter((item) => (type === 0 ? item.pid === 0 : item.pid !== 0))
        .map(async (m) => {
          return {
            author: await this.userServer.findOne(m.userId),
            ...m
          }
        })
    )
    return data
  }

  remove(id: number) {
    return `This action removes a #${id} comment`
  }
}
