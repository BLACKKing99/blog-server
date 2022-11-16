import { Injectable } from '@nestjs/common'
import { cloneDeep } from 'lodash'
import { PrismaService } from 'src/prisma/prisma.service'
import { getRandomArticle } from 'src/util'
import ArticleDto from './dto/article,dto'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'
import Article from './entitys/article.entitys'

@Injectable()
export class ArticleService {
  constructor(private readonly prisma: PrismaService) {}
  // 创建文章
  async create(createArticleDto: CreateArticleDto) {
    const article = cloneDeep(createArticleDto)
    if (!article.order && article.order !== 0) {
      const count = await this.prisma.article.count()
      article.order = count
    }
    const _article = await this.prisma.article.create({
      data: article
    })
    return _article
  }

  async addPreview(id: number) {
    const curArc = await this.prisma.article.findUnique({
      where: {
        id
      }
    })
    // 添加预览量
    await this.prisma.article.update({
      where: {
        id
      },
      data: {
        priview: curArc.priview + 1
      }
    })
    return ''
  }

  // 获取所有文章
  async findAll(params: ArticleDto) {
    const { page, pageSize } = params
    const articles = await this.prisma.article.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize
    })
    const _article = []
    const article = articles.map((item) => {
      return new Promise(async (resolve) => {
        const comment = await this.prisma.comment.findMany({
          where: {
            articleId: item.id
          }
        })
        resolve({
          ...item,
          coomentAcount: comment.length
        })
      })
    })

    for (const key of article) {
      const res = await key
      _article.push(res)
    }
    // 序列化 去除不需要的字段或者是格式化字段
    return _article.map((item) => new Article(item))
  }
  // 根据id 获取文章
  async findOne(id: number) {
    const article = await this.prisma.article.findUnique({
      where: {
        id
      }
    })
    return new Article(article)
  }

  // 获取推荐文章
  async findRecommend() {
    const articles = await this.prisma.article.findMany()
    const data = getRandomArticle(2, articles)
    const _article = data.map((item) => new Article(item))
    return _article
  }
  // 获取流行的文章
  async findPopulate() {
    const user = await this.prisma.user.findMany()
    const populate = []
    user.forEach((item) => {
      if (item.collect) {
        populate.push(...JSON.parse(item.collect))
      }
    })
    const pop = {} as Record<string, number>
    populate.forEach((item) => {
      if (pop[item] === undefined) {
        pop[item] = 1
      } else {
        pop[item] += 1
      }
    })
    const data = Object.entries(pop)
      .sort((a, b) => {
        return b[1] - a[1]
      })
      .splice(0, 3)
    let _article = await Promise.all(
      data.map(async ([id, value]) => {
        return await this.findOne(Number(id))
      })
    )
    _article = _article.map((item) => new Article(item))
    return _article
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`
  }

  remove(id: number) {
    return `This action removes a #${id} article`
  }
}
