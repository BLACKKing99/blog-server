// 装饰器
import { applyDecorators, MethodNotAllowedException, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'

export const fileFilters = (fileType: string) => {
  // 过滤文件类型
  return (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
    // 文件类型
    const type = file.mimetype

    if (!type.includes(fileType)) {
      callback(new MethodNotAllowedException('文件类型错误'), false)
    } else {
      callback(null, true)
    }
  }
}

export function FileAuth(type: 'file' = 'file', options?: MulterOptions) {
  return applyDecorators(UseInterceptors(FileInterceptor(type, options)))
}

export const ImgUpload = () => {
  return FileAuth('file', {
    limits: {
      fileSize: Math.pow(1024, 2) * 2
    },
    fileFilter: fileFilters('image')
  })
}

export const docUpload = () => {
  return FileAuth('file', {
    limits: {
      fileSize: Math.pow(1024, 2) * 2
    },
    fileFilter: fileFilters('markdown')
  })
}

export const fileUpload = (file: 'file', type: string) => {
  return FileAuth(file, {
    limits: {
      fileSize: Math.pow(1024, 2) * 2
    },
    fileFilter: fileFilters(type)
  })
}
