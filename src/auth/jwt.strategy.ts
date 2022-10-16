import { PrismaService } from 'src/prisma/prisma.service'
import { ConfigService } from '@nestjs/config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
// 策略是实现JWT的验证逻辑，策略就像你家小区的门禁验证规则，对你的身份进行查验
// 我们可以编写多个策略，比如根据用户名与密码的验证策略，或根据TOKEN的验证策略

// 会将解析token后的信息放在 Req 这个对象的user中
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // eslint-disable-next-line prettier/prettier
  constructor(configService: ConfigService, private prisma: PrismaService) {
    super({
      //解析用户提交的header中的Bearer Token数据
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //加密码的 secret
      secretOrKey: configService.get('TOKEN_SECRET')
    })
  }

  //验证通过后获取用户资料 会放在Req 这个参数中
  async validate({ sub: id }) {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }
}
