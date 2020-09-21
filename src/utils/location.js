export const CURRENT_CITY_KEY = 'CURRENT_CITY'

export const getCurrentCity = () => {
  return new Promise((resolve, reject) => {
    // 获取本地存储中是否有
    const city = localStorage[CURRENT_CITY_KEY]
    if (city) {
      // 如果有，我们直接返回城市信息就好,返回一个成功的promise对象即可
      resolve(JSON.parse(city))
    }else {
      // 获取当前城市信息
      const myCity = new window.BMap.LocalCity()
      myCity.get(async result => {
        const res = await (await fetch('http://127.0.0.1:8080/area/info?name=' + result.name)).json()
        if (res.status === 200) {
          // 保存在本地存储中
          localStorage[CURRENT_CITY_KEY] = JSON.stringify(res.body)
          // 返回城市的数据
          resolve(res.body)
        }else reject(res)
      })
    }
  })
}