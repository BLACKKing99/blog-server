import { Controller, Get, Post, Body, Param, Delete, Req, Query, ParseIntPipe } from '@nestjs/common'
import { user } from '@prisma/client'
import { Request } from 'express'
import { Auth } from 'src/decorator/auth.decorator'
import { CommentService } from './comment.service'
import { CreateCommentDto } from './dto/create-comment.dto'

@Controller('comment')
@Auth()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto, @Req() req: Request) {
    const user = req.user as user
    return this.commentService.create(createCommentDto, user.id)
  }

  @Get()
  findOne(@Query('id', new ParseIntPipe()) id: number) {
    return this.commentService.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id)
  }
}
