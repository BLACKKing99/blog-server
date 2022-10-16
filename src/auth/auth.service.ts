import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { hash, verify } from 'argon2'
import RegisterDto from './dto/register.dto'
import { user } from '@prisma/client'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import LoginDto from './dto/login.dto'
import { randomAccount } from 'src/util'
import AuthEntitys from './entitys/auth.entitys'

@Injectable()
export class AuthService {
  // eslint-disable-next-line prettier/prettier
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

  async register(data: RegisterDto) {
    const { email, name, password } = data
    const pass = await hash(password)
    const user = await this.prisma.user.create({
      data: {
        account: randomAccount(7),
        email,
        name,
        password: pass
      }
    })
    const token = await this.setToken(user)

    return {
      user: new AuthEntitys(user),
      token
    }
  }

  async setToken({ name, id }: user) {
    const token = await this.jwt.signAsync(
      {
        name,
        sub: id
      },
      {
        secret: this.config.get('TOKEN_SECRET')
      }
    )
    return token
  }

  async login(data: LoginDto) {
    const { account, password } = data
    const user = await this.prisma.user.findUnique({
      where: {
        account
      }
    })
    if (!user) {
      throw new BadRequestException('账号不存在')
    }
    const paMatch = await verify(user.password, password)
    if (!paMatch) {
      throw new BadRequestException('密码错误')
    }
    const token = await this.setToken(user)

    return {
      user: new AuthEntitys(user),
      token
    }
  }
  async findAll() {
    const users = await this.prisma.user.findMany()
    return users
  }
}
