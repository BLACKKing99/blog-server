import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common'
import { Auth } from 'src/decorator/auth.decorator'
import { ToInt } from 'src/pipes/ToInt.pip'
import { ArticleService } from './article.service'
import ArticleDto from './dto/article,dto'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto)
  }
  @Post('preview')
  addPreview(@Body(new ToInt('id')) data: { id: number }) {
    return this.articleService.addPreview(data.id)
  }

  @Get()
  findAll(@Query(new ToInt('page,pageSize')) params: ArticleDto) {
    // 获取所有文章   暂时没有过滤
    const _params = {
      page: 1,
      pageSize: 10,
      ...params
    }
    return this.articleService.findAll(_params)
  }
  @Get('recommend')
  findRecommend() {
    // 获取所有文章   暂时没有过滤
    return this.articleService.findRecommend()
  }
  @Get('populate')
  findPopulate() {
    // 获取所有文章   暂时没有过滤
    return this.articleService.findPopulate()
  }

  @Get('info')
  findOne(@Query('id') id: string) {
    return this.articleService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id)
  }
}
