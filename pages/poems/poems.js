const authors = require('../../data/authors.js')
const { poemsByAuthor } = require('../../data/poems/index.js')

Page({
  data: {
    author: null,
    poems: [],
    filtered: [],
    searchKey: '',
    searching: false
  },
  onLoad(options) {
    const id = options.id
    const author = authors.find((a) => a.id === id)
    if (!author) {
      wx.showToast({ title: '未找到该人物', icon: 'none' })
      return
    }
    const poems = (poemsByAuthor[id] || []).map((p) => {
      const firstLine = p.content.split('\n')[0] || ''
      return Object.assign({}, p, { firstLine })
    })
    wx.setNavigationBarTitle({ title: `${author.name} · 作品` })
    this.setData({ author, poems, filtered: poems })
  },
  onSearchInput(e) {
    const key = (e.detail.value || '').trim()
    if (!key) {
      this.setData({ searchKey: '', searching: false, filtered: this.data.poems })
      return
    }
    const lower = key.toLowerCase()
    const filtered = this.data.poems.filter((p) =>
      p.title.toLowerCase().indexOf(lower) >= 0 || p.content.toLowerCase().indexOf(lower) >= 0)
    this.setData({ searchKey: key, searching: true, filtered })
  },
  onClearSearch() {
    this.setData({ searchKey: '', searching: false, filtered: this.data.poems })
  },
  onTapPoem(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/packagePoem/pages/poem/poem?id=${id}` })
  },
  onShareAppMessage() {
    return { title: `唐宋八大家 · ${this.data.author.name} 作品` }
  }
})
