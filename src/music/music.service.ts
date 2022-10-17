import { Injectable } from '@nestjs/common'
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
import { request } from 'src/plugin/axios'
@Injectable()
export class MusicService {
  async getHotType(query: IHotType) {
    const _query = {
      cat: query.cat || '全部', // 全部,华语,欧美,日语,韩语,粤语,小语种,流行,摇滚,民谣,电子,舞曲,说唱,轻音乐,爵士,乡村,R&B/Soul,古典,民族,英伦,金属,朋克,蓝调,雷鬼,世界音乐,拉丁,另类/独立,New Age,古风,后摇,Bossa Nova,清晨,夜晚,学习,工作,午休,下午茶,地铁,驾车,运动,旅行,散步,酒吧,怀旧,清新,浪漫,性感,伤感,治愈,放松,孤独,感动,兴奋,快乐,安静,思念,影视原声,ACG,儿童,校园,游戏,70后,80后,90后,网络歌曲,KTV,经典,翻唱,吉他,钢琴,器乐,榜单,00后
      order: query.order || 'hot', // hot,new
      limit: query.limit || 50,
      offset: query.offset || 0
    }
    const { data } = await request('POST', 'https://music.163.com/weapi/playlist/list', _query, { crypto: 'weapi' })
    return data
  }

  async getSheetList(query: ISheetDetail) {
    const _query = {
      id: query.id,
      n: 100000,
      s: query.s || 8
    }
    const limit = query.limit || 20
    const offset = query.offset || 0
    const { data } = await request('POST', 'https://music.163.com/api/v6/playlist/detail', _query, {
      crypto: 'api'
    }).then((res: any) => {
      const trackIds = res.data.playlist.trackIds
      const idsData = {
        c:
          '[' +
          trackIds
            .slice(offset, offset + limit)
            .map((item) => '{"id":' + item.id + '}')
            .join(',') +
          ']'
      }
      return request('POST', 'https://music.163.com/weapi/v3/song/detail', idsData, { crypto: 'weapi' })
    })
    return data
  }

  async getSheetDetail(query: ISheetDetail) {
    const _query = {
      id: query.id,
      n: 100000,
      s: query.s || 8
    }
    const { data } = await request('POST', 'https://music.163.com/api/v6/playlist/detail', _query, { crypto: 'api' })
    return data
  }

  async getVocaRecoment(query: IVocaRecommend) {
    const _query = {
      offset: query.offset || 0,
      limit: query.limit || 30,
      total: true,
      type: query.type || '1',
      area: query.area
    }
    const { data } = await request('POST', 'https://music.163.com/api/v1/artist/list', _query, { crypto: 'weapi' })
    return data
  }

  async getBoutique(query: IBoutique) {
    const _query = {
      cat: query.cat || '全部', // 全部,华语,欧美,韩语,日语,粤语,小语种,运动,ACG,影视原声,流行,摇滚,后摇,古风,民谣,轻音乐,电子,器乐,说唱,古典,爵士
      limit: query.limit || 50,
      lasttime: query.before || 0, // 歌单updateTime
      total: true
    }
    const { data } = await request('POST', `https://music.163.com/api/playlist/highquality/list`, _query, {
      crypto: 'weapi'
    })
    return data
  }

  async getMusicUrl(query: IMusicUrl) {
    const _query = {
      ids: '[' + query.id + ']',
      br: query.br || 999000
    }
    const { data } = await request('POST', `https://interface3.music.163.com/eapi/song/enhance/player/url`, _query, {
      crypto: 'eapi',
      url: '/api/song/enhance/player/url'
    })
    return data
  }
  async getMusicDetail(query: IMusicDetail) {
    const ids = query.ids.split(/\s*,\s*/)
    const _query = {
      c: '[' + ids.map((id) => '{"id":' + id + '}').join(',') + ']'
    }
    const { data } = await request('POST', `https://music.163.com/api/v3/song/detail`, _query, {
      crypto: 'weapi'
    })
    return data
  }

  async getMusicLyric(query: IMusicLyric) {
    const _query = {
      id: query.id,
      tv: -1,
      lv: -1,
      rv: -1,
      kv: -1
    }
    const { data } = await request('POST', `https://music.163.com/api/song/lyric?_nmclfl=1`, _query, {})
    return data
  }

  async getSingerDetail(query: ISingerDetail) {
    const _query = {
      id: query.id
    }
    const { data } = await request('POST', `https://music.163.com/api/artist/head/info/get`, _query, {
      crypto: 'weapi'
    })
    return data
  }
}
