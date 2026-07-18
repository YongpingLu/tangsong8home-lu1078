Page({
  data: {
    consented: false
  },

  onLoad() {
    const consented = wx.getStorageSync('voiceConsent') === 'yes'
    this.setData({ consented })
  },

  onAgree() {
    wx.setStorageSync('voiceConsent', 'yes')
    this.setData({ consented: true })
    wx.showToast({ title: '已同意授权', icon: 'success' })
    setTimeout(() => wx.navigateBack(), 600)
  },

  onDisagree() {
    wx.setStorageSync('voiceConsent', 'no')
    this.setData({ consented: false })
    wx.showToast({ title: '已撤回授权', icon: 'none' })
  }
})
