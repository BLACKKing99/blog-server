import { Controller, Get, Query } from '@nestjs/common'
import { IPreviewPhoto } from 'src/types'
import { PreviewService } from './preview.service'
@Controller('preview')
export class PreviewController {
  constructor(private readonly previewServer: PreviewService) {}
  @Get('swiper')
  getSwiper() {
    return this.previewServer.getSwiper()
  }

  @Get('banner')
  getBanner() {
    return this.previewServer.getBanner()
  }
  @Get('photos')
  getPhotos(@Query() query: IPreviewPhoto) {
    return this.previewServer.getPhotos(query)
  }
}
