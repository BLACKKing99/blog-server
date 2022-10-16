import { Module } from '@nestjs/common'
import { CommentService } from './comment.service'
import { CommentController } from './comment.controller'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'

@Module({
  imports: [UserModule],
  controllers: [CommentController],
  providers: [CommentService, UserService]
})
export class CommentModule {}
