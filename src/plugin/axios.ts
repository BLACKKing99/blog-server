import Axios from 'axios'
import { cloneDeep } from 'lodash'
import { eapi, weapi } from 'src/util/crypto'
import http from 'http'
import https from 'https'

export const request = (method: 'POST' | 'GET', url: string, data: any, options: Record<string, string>) => {
  let _data = cloneDeep(data)
  if (options.crypto === 'weapi') {
    _data.csrf_token = ''
    _data = weapi(_data)
    url = url.replace(/\w*api/, 'weapi')
  } else if (options.crypto === 'eapi') {
    _data = eapi(options.url, _data)
  }
  return Axios({
    method,
    url,
    data: new URLSearchParams(_data).toString(),
    httpAgent: new http.Agent({ keepAlive: true }),
    httpsAgent: new https.Agent({ keepAlive: true })
  })
}
