import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCategoryDto: CreateCategoryDto) {
    const category = this.prisma.category.create({
      data: createCategoryDto
    })
    return category
  }

  async findAll() {
    // 返回所有分类
    const categorys = await this.prisma.category.findMany()
    return categorys
  }

  findOne(id: number) {
    const category = this.prisma.category.findUnique({
      where: {
        id
      }
    })
    return category
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`
  }

  async remove(id: number) {
    await this.prisma.category.delete({
      where: {
        id
      }
    })
    return '删除成功'
  }
}
