export const randomAccount = (num: number, account?: number): number => {
  const arr = []
  for (let index = 0; index < num; index++) {
    const number = Math.floor(Math.random() * 9)
    arr.push(number)
  }
  const _account = Number(arr.join(''))
  //   if (_account === account) {
  //     randomAccount(num, account)
  //   } else {
  //     return _account
  //   }
  return _account
}

export const randomNum = (min: number, max: number): number => {
  const num = Math.ceil(Math.random() * (max - min)) + min
  return num
}

export const getRandomArticle = (n: number, arr: any[]) => {
  const todoArr = [...arr]
  const result = []
  for (let i = 0; i < n; ++i) {
    const random = Math.floor(Math.random() * todoArr.length)
    const index = result.findIndex((item) => item._id === todoArr[random]._id)
    if (index !== -1) {
      continue
    }
    result.push(todoArr[random])
    todoArr.splice(random, 1)
  }
  return result
}
