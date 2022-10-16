import { Controller, Get, Post, Body, Param, Delete, Req, Put, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { CollectTypeDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { Auth } from 'src/decorator/auth.decorator'
import { Request } from 'express'
import { ToInt } from 'src/pipes/ToInt.pip'

@Controller('user')
@Auth()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findCurrenUser(@Req() req: Request) {
    return this.userService.findCurrenUser(req)
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id)
  // }

  @Get('collect')
  findCollect(@Query('id', new ToInt('id')) id: number, @Req() req: Request) {
    return this.userService.findCollect(id, req)
  }

  @Post('collect')
  dealCollect(@Body() data: CollectTypeDto, @Req() req: Request) {
    return this.userService.dealCollect(data, req)
  }
  @Put()
  update(@Body() updateUserDto: UpdateUserDto, @Req() req: Request) {
    return this.userService.update(updateUserDto, req)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
