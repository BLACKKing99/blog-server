import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { cloneDeep } from 'lodash'

@Injectable()
export class ToInt implements PipeTransform {
  table: string
  constructor(data?: string) {
    this.table = data
  }
  transform(value: any, metadata: ArgumentMetadata) {
    let _data = cloneDeep(value)
    if (typeof _data === 'string') {
      // 如果是字符串
      _data = Number(_data)
    } else if (typeof _data === 'object' && !Array.isArray(_data)) {
      // 否则就是对象
      if (this.table) {
        // 如果有传入table字段  则选择其中的table字段
        const tableArr = this.table.split(',')
        tableArr.forEach((item) => {
          if (_data[item]) {
            _data[item] = Number(_data[item])
          }
        })
      } else {
        // 否则遍历对象 一般用不到 所以说暂时不写了
      }
    }
    return _data
  }
}
