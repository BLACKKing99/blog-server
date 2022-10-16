import { Injectable } from '@nestjs/common'
import { user } from '@prisma/client'
import { Request } from 'express'
import { PrismaService } from 'src/prisma/prisma.service'
import { CollectTypeDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import User from './entitys/user.entitys'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  // 获取当前用户
  async findCurrenUser(req: Request) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: (req.user as user).id
      }
    })
    return new User(user)
  }
  // 根据id找到当前用户
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id
      }
    })
    return new User(user)
  }
  async dealCollect(data: CollectTypeDto, req: Request) {
    const { articleId, type } = data
    const _user = req.user as user
    let msg = ''
    const user = await this.prisma.user.findUnique({
      where: {
        id: _user.id
      }
    })
    const collect = user.collect ? (JSON.parse(user.collect) as number[]) : []
    if (type === '1') {
      // 添加收藏
      const index = collect.findIndex((item) => item === articleId)
      if (index === -1) {
        collect.push(articleId)
        msg = '收藏成功'
      }
    } else {
      // 取消收藏
      const index = collect.findIndex((item) => Number(item) === articleId)
      if (index !== -1) {
        collect.splice(index, 1)
        msg = '取消收藏成功'
      }
    }

    this.update({ collect: JSON.stringify(collect) }, req)
    return msg
  }
  // 获取该用户所有收藏
  async findCollect(id?: number, req?: Request) {
    console.log(id, '33333333')

    let user = null
    if (id) {
      user = await this.prisma.user.findUnique({
        where: {
          id
        }
      })
    } else {
      user = await this.prisma.user.findUnique({
        where: {
          id: (req.user as user).id
        }
      })
    }
    const collect = JSON.parse(user.collect) as number[]
    const detCollect = await Promise.all(
      collect.map(async (item) => {
        return await this.findOneArticle(item)
      })
    )
    return detCollect
  }
  async findOneArticle(id: number) {
    const article = await this.prisma.article.findUnique({
      where: {
        id
      }
    })
    return article
  }
  // 更新用户信息
  async update(updateUserDto: UpdateUserDto, req?: Request) {
    const user = req.user as user
    const updateUser = await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        ...updateUserDto
      }
    })
    return new User(updateUser)
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
