import { Controller, Get, Query } from '@nestjs/common'
import { ToInt } from 'src/pipes/ToInt.pip'
import {
  IBoutique,
  IHotType,
  IMusicDetail,
  IMusicLyric,
  IMusicUrl,
  ISheetDetail,
  ISingerDetail,
  IVocaRecommend
} from './dto/music.dto'
import { MusicService } from './music.service'

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get('artist/list')
  // 获取歌手推荐
  getVocaRecoment(@Query() query: IVocaRecommend) {
    return this.musicService.getVocaRecoment(query)
  }

  @Get('top/playlist')
  // 获取热门歌单
  getHotType(@Query() query: IHotType) {
    return this.musicService.getHotType(query)
  }

  @Get('playlist/track/all')
  // 获取每个热门歌单列表
  getSheetList(@Query(new ToInt('limit,offset')) query: ISheetDetail) {
    return this.musicService.getSheetList(query)
  }

  @Get('playlist/detail')
  // 获取每个热门歌单列表
  getSheetDetail(@Query() query: ISheetDetail) {
    return this.musicService.getSheetDetail(query)
  }

  @Get('top/playlist/highquality')
  // 获取精品推荐
  getBoutique(@Query() query: IBoutique) {
    return this.musicService.getBoutique(query)
  }

  @Get('song/url')
  // 获取音乐 url
  getMusicUrl(@Query(new ToInt('id')) query: IMusicUrl) {
    return this.musicService.getMusicUrl(query)
  }

  @Get('song/detail')
  // 获取音乐详情
  getMusicDetail(@Query() query: IMusicDetail) {
    return this.musicService.getMusicDetail(query)
  }

  @Get('lyric')
  // 获取歌词
  getMusicLyric(@Query(new ToInt('id')) query: IMusicLyric) {
    return this.musicService.getMusicLyric(query)
  }

  @Get('artist/detail')
  // 获取歌手详情
  getSingerDetail(@Query(new ToInt('id')) query: ISingerDetail) {
    return this.musicService.getSingerDetail(query)
  }
}
