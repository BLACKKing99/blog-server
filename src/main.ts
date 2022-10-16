import { ClassSerializerInterceptor } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import Validate from './common/Validate'
import { TransformInterceptor } from './interceptor/transFormInterceptor'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useStaticAssets('uploads', {
    prefix: '/uploads'
  })
  app.setGlobalPrefix('api')
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(new Validate())
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.enableCors()
  await app.listen(3000)
}
bootstrap()
