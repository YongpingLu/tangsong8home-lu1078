const authors = require('../../data/authors.js')

Page({
  data: {
    authorName: '',
    episodes: [],
    copiedIdx: -1,
    vNote: '该节目版权归中央广播电视总台，受版权与防盗链保护，小程序内暂不支持直接播放。\n点击下方对应集数的「复制观看链接」按钮，复制央视官方链接后，在手机浏览器或「央视频」App 中粘贴打开即可观看。'
  },

  onLoad(opts) {
    const a = authors.find((x) => x.id === opts.id)
    if (a) {
      const episodes = (a.videos || []).map((v, i) => ({
        label: v.label || ('第' + (i + 1) + '集'),
        title: v.title || '',
        pageUrl: v.pageUrl || '',
        url: v.url || ''
      }))
      this.setData({
        authorName: a.name,
        episodes: episodes
      })
      wx.setNavigationBarTitle({ title: a.name + ' · 纪录片' })
    }
  },

  // 复制某一集的央视官方观看链接
  onCopyLink(e) {
    const url = e.currentTarget.dataset.url
    const idx = e.currentTarget.dataset.idx
    if (!url) {
      wx.showToast({ title: '暂无观看链接', icon: 'none' })
      return
    }
    wx.setClipboardData({
      data: url,
      success: () => {
        this.setData({ copiedIdx: idx })
        wx.showModal({
          title: '链接已复制',
          content: '已复制央视官方观看链接，请在手机浏览器或「央视频」App 中粘贴打开观看。',
          showCancel: false,
          confirmText: '知道了'
        })
      }
    })
  },

  onShareAppMessage() {
    return { title: (this.data.authorName || '唐宋八大家') + ' · 央视纪录片' }
  }
})
