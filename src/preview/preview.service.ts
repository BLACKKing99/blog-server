import { Injectable } from '@nestjs/common'
import { readdirSync } from 'fs'
import path from 'path'
import { IPreviewPhoto } from 'src/types'
import { randomNum } from 'src/util'

@Injectable()
export class PreviewService {
  getSwiper() {
    const data = [
      {
        url: '/uploads/image/swiper/swiper1.jpg'
      },
      {
        url: '/uploads/image/swiper/swiper2.jpg'
      },
      {
        url: '/uploads/image/swiper/swiper3.jpg'
      }
    ]
    return data
  }
  async getBanner() {
    const imgPath = path.resolve('uploads/image/swiper')
    const files = await readdirSync(imgPath)
    const bannerArr = []
    for (const file of files) {
      bannerArr.push(`/uploads/image/swiper/${file}`)
    }
    const random = randomNum(0, bannerArr.length - 1)
    const data = bannerArr.find((item, index) => {
      return index === random
    })
    return data
  }

  async getPhotos(query: IPreviewPhoto) {
    const limit = query.limit || 20
    const page = query.page || 1
    const imgPath = path.resolve('uploads/image/photos')
    const files = await readdirSync(imgPath)
    const bannerArr = []
    for (const file of files) {
      bannerArr.push(`/uploads/image/photos/${file}`)
    }
    bannerArr.sort(() => Math.random() - 0.5)
    const data = bannerArr.slice((page - 1) * limit, page * limit)
    return data
  }
}
