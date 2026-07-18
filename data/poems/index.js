// 聚合各作者诗词数据，统一附加 authorId 与全局唯一 id
const hanyu = require('./hanyu.js')
const liuzongyuan = require('./liuzongyuan.js')
const ouyangxiu = require('./ouyangxiu.js')
const suxun = require('./suxun.js')
const zenggong = require('./zenggong.js')
const wanganshi = require('./wanganshi.js')
const sushi = require('./sushi.js')
const suzhe = require('./suzhe.js')

const rawMap = {
  hanyu,
  liuzongyuan,
  ouyangxiu,
  suxun,
  zenggong,
  wanganshi,
  sushi,
  suzhe
}

// 每位作者保留“最有名的前 N 首”（按数组顺序），此处上限 40
const LIMIT = 40

const poemsByAuthor = {}
const allPoems = []
const poemById = {}

Object.keys(rawMap).forEach((authorId) => {
  const list = (rawMap[authorId] || []).slice(0, LIMIT)
  const withMeta = list.map((p, i) => {
    const id = `${authorId}-${i + 1}`
    const item = Object.assign({}, p, { id, authorId, index: i + 1 })
    poemById[id] = item
    allPoems.push(item)
    return item
  })
  poemsByAuthor[authorId] = withMeta
})

module.exports = {
  poemsByAuthor,
  allPoems,
  poemById,
  LIMIT
}
