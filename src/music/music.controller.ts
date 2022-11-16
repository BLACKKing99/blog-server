import { Controller, Get, Query } from '@nestjs/common'
import { ToInt } from 'src/pipes/ToInt.pip'
import {
  IAlbumList,
  IAllMvList,
  IBoutique,
  IHotType,
  IMusicDetail,
  IMusicLyric,
  IMusicUrl,
  IMvDetail,
  IMvList,
  IMvUrl,
  ISheetDetail,
  ISingerDetail,
  ISingerList,
  ISingerListLimit,
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

  @Get('artists')
  // 获取歌手单曲
  getSingerList(@Query() query: ISingerList) {
    return this.musicService.getSingerList(query)
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

  @Get('artist/songs')
  // 歌手全部歌曲
  getSingerListLimit(@Query(new ToInt('id,limit,offset')) query: ISingerListLimit) {
    return this.musicService.getSingerListLimit(query)
  }

  @Get('artist/album')
  // 歌手全部专辑
  getAlbumList(@Query(new ToInt('id,limit,offset')) query: IAlbumList) {
    return this.musicService.getAlbumList(query)
  }

  @Get('artist/mv')
  // 歌手全部mv
  getMvList(@Query(new ToInt('id,limit,offset')) query: IMvList) {
    return this.musicService.getMvList(query)
  }

  @Get('mv/all')
  // 歌手全部歌曲
  getAllMvList(@Query(new ToInt('id,limit,offset')) query: IAllMvList) {
    return this.musicService.getAllMvList(query)
  }

  @Get('mv/detail')
  // mv详情
  getMvDetail(@Query(new ToInt('id')) query: IMvDetail) {
    return this.musicService.getMvDetail(query)
  }

  @Get('mv/url')
  // mv详情
  getMvUrl(@Query() query: IMvUrl) {
    return this.musicService.getMvUrl(query)
  }
}
