const authors = require('../../data/authors.js')
const { poemsByAuthor } = require('../../data/poems/index.js')

Page({
  data: {
    author: null,
    count: 0
  },
  onLoad(options) {
    const id = options.id
    const author = authors.find((a) => a.id === id)
    if (!author) {
      wx.showToast({ title: '未找到该人物', icon: 'none' })
      return
    }
    const poems = poemsByAuthor[id] || []
    wx.setNavigationBarTitle({ title: author.name })
    this.setData({ author, count: poems.length })
  },
  goPoems() {
    wx.navigateTo({
      url: `/pages/poems/poems?id=${this.data.author.id}`
    })
  },
  onTapVideo() {
    wx.navigateTo({
      url: `/pages/video/video?id=${this.data.author.id}`
    })
  },
  onShareAppMessage() {
    const a = this.data.author
    return { title: `唐宋八大家 · ${a.name}` }
  }
})
