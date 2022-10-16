/* eslint-disable prettier/prettier */
import { Controller, Post, UploadedFile } from '@nestjs/common'
import { docUpload, ImgUpload } from 'src/decorator/file.decorator'

@Controller('upload')
export class UploadController {
  @Post('avatar')
  // 自己封装的图片上传装饰器
  @ImgUpload()
  uploadImg(@UploadedFile() file:Express.Multer.File) {
    if (file.filename.split('.').length < 2) {
      const type = file.mimetype.split('/')[1]
      file.filename = `${file.filename}.${type}`
    }
    const _file = {
      ...file,
      url:"/uploads/avatar/" + file.filename
    }
    return _file
  }
  @Post('article')
  // 自己封装的图片上传装饰器
  @ImgUpload()
  uploadArticle(@UploadedFile() file:Express.Multer.File) {
    if (file.filename.split('.').length < 2) {
      const type = file.mimetype.split('/')[1]
      file.filename = `${file.filename}.${type}`
    }
    const _file = {
      ...file,
      url:"/uploads/article/" + file.filename
    }
    return _file
  }
  @Post('doc')
  @docUpload()
  uploadDoc(@UploadedFile() file:Express.Multer.File){
    return file
  }
}
