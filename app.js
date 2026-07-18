App({
  globalData: {
    appName: '唐宋八大家'
  },
  onLaunch() {
    // 处理微信隐私授权：用户首次触发录音等敏感接口时，由微信底层弹出隐私协议确认。
    // 注意：用户同意后应直接 resolve()，切勿在回调内再次调用 requirePrivacyAuthorize（会导致递归死循环）。
    if (typeof wx.onNeedPrivacyAuthorize === 'function') {
      wx.onNeedPrivacyAuthorize((resolve, reject) => {
        wx.showModal({
          title: '隐私授权提示',
          content: '本小程序「我要跟读」功能需要使用录音权限，相关说明详见《声纹授权协议》。',
          confirmText: '同意并继续',
          cancelText: '暂不同意',
          success: (res) => {
            if (res.confirm) {
              resolve()
            } else {
              reject && reject()
            }
          },
          fail: () => { reject && reject() }
        })
      })
    }
  }
})
