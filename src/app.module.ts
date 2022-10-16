import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth/auth.controller'
import { AuthModule } from './auth/auth.module'
import { AuthService } from './auth/auth.service'
import { PrismaController } from './prisma/prisma.controller'
import { PrismaModule } from './prisma/prisma.module'
import { UploadModule } from './upload/upload.module'
import { ArticleModule } from './article/article.module'
import { CategoryModule } from './category/category.module'
import { PreviewModule } from './preview/preview.module'
import { UserModule } from './user/user.module'
import { CommentModule } from './comment/comment.module'
import { MusicModule } from './music/music.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    JwtModule,
    UploadModule,
    ArticleModule,
    CategoryModule,
    PreviewModule,
    UserModule,
    CommentModule,
    MusicModule
  ],
  controllers: [AuthController, PrismaController],
  providers: [AuthService]
})
export class AppModule {}
