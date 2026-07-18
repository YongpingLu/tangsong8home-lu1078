const authors = require('../../data/authors.js')
const { poemsByAuthor, allPoems } = require('../../data/poems/index.js')

// 计算每位作者的诗词数量
const list = authors.map((a) => {
  const poems = poemsByAuthor[a.id] || []
  return Object.assign({}, a, { count: poems.length })
})

Page({
  data: {
    authors: list,
    searchKey: '',
    searching: false,
    searchResults: []
  },

  onSearchInput(e) {
    const key = (e.detail.value || '').trim()
    if (!key) {
      this.setData({ searchKey: '', searching: false, searchResults: [] })
      return
    }
    const lower = key.toLowerCase()
    const results = allPoems
      .filter((p) => p.title.toLowerCase().indexOf(lower) >= 0 || p.content.toLowerCase().indexOf(lower) >= 0)
      .map((p) => {
        const author = authors.find((a) => a.id === p.authorId)
        return {
          id: p.id,
          title: p.title,
          authorName: author ? author.name : '',
          firstLine: p.content.split('\n')[0] || ''
        }
      })
    this.setData({ searchKey: key, searching: true, searchResults: results })
  },

  onClearSearch() {
    this.setData({ searchKey: '', searching: false, searchResults: [] })
  },

  onTapSearchResult(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/packagePoem/pages/poem/poem?id=${id}` })
  },

  onTapAuthor(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/person/person?id=${id}` })
  },
  onTapVideo(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/video/video?id=${id}` })
  },
  onShareAppMessage() {
    return { title: '唐宋八大家 · 品读千古文章' }
  }
})
