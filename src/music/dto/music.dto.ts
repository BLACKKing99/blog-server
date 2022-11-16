export interface IVocaRecommend {
  limit?: number
  offset?: number
  type?: '-1' | '1' | '2' | '3' // -1 全部 1 男歌手 2 女歌手 3 乐队
  area?: '-1' | '7' | '96' | '8' | '16' | '0' // -1全部 7华语 96欧美 8日本 16韩国 0其他
}

export interface IHotType {
  limit?: number
  cat?: string
  offset?: number
  order?: 'hot' | 'new'
}

export interface ISheetDetail {
  id: number
  limit?: number
  offset?: number
  s?: number
}

export interface IBoutique {
  limit?: number
  before?: number | undefined
  cat?: string
}

export interface IMusicUrl {
  id: number
  br: number
}

export interface IMusicDetail {
  ids: string
}

export interface IMusicLyric {
  id: number
}

export interface ISingerDetail {
  id: number
}

export interface ISingerList {
  id: number
}

export interface ISingerListLimit {
  id: number
  order?: 'hot' | 'time'
  limit?: number
  offset?: number
}

export interface IAlbumList {
  id: number
  limit?: number
  offset?: number
}

export interface IMvList {
  id: number
  limit?: number
  offset?: number
}

export interface IAllMvList {
  area?: string
  order?: number
  type?: string
  limit?: number
  offset?: number
}

export interface IMvDetail {
  id: number
}

export interface IMvUrl {
  id: number
  r: number
}
