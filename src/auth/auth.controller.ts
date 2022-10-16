import { Body, Controller, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { Auth } from 'src/decorator/auth.decorator'
import LoginDto from './dto/login.dto'
import RegisterDto from './dto/register.dto'
import { ToInt } from 'src/pipes/ToInt.pip'
import { AuthService } from './auth.service'

@Controller()
export class AuthController {
  constructor(private readonly authServeer: AuthService) {}
  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.authServeer.register(data)
  }

  @Post('login')
  login(@Body(new ToInt('account')) data: LoginDto) {
    return this.authServeer.login(data)
  }
}
