import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'
import { UploadController } from './upload.controller'
import { UploadService } from './upload.service'

const AvatarUpload = MulterModule.registerAsync({
  useFactory() {
    return {
      storage: diskStorage({
        //文件储存位置
        destination: 'uploads/avatar',
        //文件名定制
        filename: (req, file, callback) => {
          const type = file.mimetype.split('/')[1]
          const path = Date.now() + '-' + Math.round(Math.random() * 1e10) + extname(file.originalname)
          if (file.originalname === 'blob') {
            callback(null, `${path}.${type}`)
            return
          }
          callback(null, path)
        }
      })
    }
  }
})
const ArticleUpload = MulterModule.registerAsync({
  useFactory() {
    return {
      storage: diskStorage({
        //文件储存位置
        destination: 'uploads/article',
        //文件名定制
        filename: (req, file, callback) => {
          const type = file.mimetype.split('/')[1]
          const path = Date.now() + '-' + Math.round(Math.random() * 1e10) + extname(file.originalname)
          if (file.originalname === 'blob') {
            callback(null, `${path}.${type}`)
            return
          }
          callback(null, path)
        }
      })
    }
  }
})
@Module({
  imports: [AvatarUpload, ArticleUpload],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
