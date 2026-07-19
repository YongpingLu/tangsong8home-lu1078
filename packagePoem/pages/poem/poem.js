const authors = require('../../../data/authors.js')
const { poemById, poemsByAuthor } = require('../../../data/poems/index.js')

Page({
  data: {
    poem: null,
    author: null,
    lines: [],
    translation: '',
    showTranslation: false,
    reciting: false,          // 是否正在跟读录音
    display: [],              // 跟读结果（原文逐字，供对照）
    userAudio: '',            // 用户录音临时路径
    playState: 'idle',        // 回放自评状态：idle / playing / paused
    hasPrev: false,
    hasNext: false
  },

  onLoad(options) {
    const poem = poemById[options.id]
    if (!poem) {
      wx.showToast({ title: '未找到该作品', icon: 'none' })
      return
    }
    const author = authors.find((a) => a.id === poem.authorId)
    const lines = poem.content.split('\n')
    const list = poemsByAuthor[poem.authorId] || []
    const idx = list.findIndex((p) => p.id === poem.id)

    wx.setNavigationBarTitle({ title: poem.title })

    this._audio = null      // 当前回放实例
    this._pos = 0           // 回放进度（秒），用于暂停后续播

    this.setData({
      poem,
      author,
      lines,
      translation: poem.translation || '',
      hasPrev: idx > 0,
      hasNext: idx >= 0 && idx < list.length - 1
    })
    this._initRecorder()
  },

  onUnload() {
    if (this._recorder) {
      try { this._recorder.stop() } catch (e) {}
    }
    this._destroyAudio()
    if (this._stopTimer) { clearTimeout(this._stopTimer); this._stopTimer = null }
  },

  // 译文展开 / 收起
  onToggleTranslation() {
    this.setData({ showTranslation: !this.data.showTranslation })
  },

  // ===== 跟读（原生录音，仅本机回放，不上传） =====
  _recorder: null,
  _started: false,           // 录音是否已真正开始（用于兜底判断）
  _stopTimer: null,

  _initRecorder() {
    const recorder = wx.getRecorderManager()
    // 注意：必须用函数调用方式监听（recorder.onStart(cb)），属性赋值在真机上可能失效
    recorder.onStart(() => {
      this._started = true
      this.setData({ reciting: true })
      console.log('[Recorder] onStart')
    })
    recorder.onStop((res) => {
      console.log('[Recorder] onStop', res)
      this._onReciteStop(res)
    })
    recorder.onError((err) => {
      console.error('[Recorder] onError', err)
      this._started = false
      if (this._stopTimer) { clearTimeout(this._stopTimer); this._stopTimer = null }
      this.setData({ reciting: false })
      const msg = (err && err.errMsg) || ''
      if (msg.indexOf('auth') >= 0 || msg.indexOf('permission') >= 0) {
        wx.showModal({
          title: '需要录音权限',
          content: '请在系统设置中开启「麦克风」权限后重试跟读。',
          confirmText: '去设置',
          cancelText: '知道了',
          success: (m) => { if (m.confirm) wx.openSetting() }
        })
      } else {
        wx.showToast({ title: '录音失败，请重试', icon: 'none' })
      }
    })
    this._recorder = recorder
  },

  onStartRecite() {
    if (!this._recorder) {
      wx.showToast({ title: '当前环境不支持录音', icon: 'none' })
      return
    }
    // 开始录音前，先停止可能正在进行的回放，避免声音叠加
    this._destroyAudio()
    this._started = false
    // 立即切换为「停止跟读」，录音真正开始由 onStart 确认
    this.setData({ reciting: true, display: [], userAudio: '' })
    console.log('[Recite] onStartRecite -> recorder.start')
    this._doStartRecord()
  },

  _doStartRecord() {
    try {
      // start 是隐私接口：若隐私协议未授权，微信触发全局 onNeedPrivacyAuthorize 弹窗；
      // 若录音权限未授权，会拉起系统录音权限框。两者通过后 onStart 才触发。
      this._recorder.start({ duration: 60000, format: 'mp3' })
    } catch (e) {
      this.setData({ reciting: false })
      wx.showToast({ title: '录音启动失败，请检查权限', icon: 'none' })
    }
  },

  onStopRecite() {
    if (!this._recorder) return
    console.log('[Recite] onStopRecite -> recorder.stop, started=', this._started)
    this._recorder.stop()
    // 兜底：若 1.5s 内未触发 onStop（如未真正开始录音），恢复状态并提示
    this._stopTimer = setTimeout(() => {
      console.log('[Recite] fallback timeout, reciting=', this.data.reciting)
      if (this.data.reciting) {
        this.setData({ reciting: false, _started: false })
        wx.showToast({ title: '未捕获到录音，请重试', icon: 'none' })
      }
    }, 1500)
  },

  _onReciteStop(res) {
    if (this._stopTimer) { clearTimeout(this._stopTimer); this._stopTimer = null }
    this._started = false
    this.setData({ reciting: false, userAudio: res.tempFilePath || '' })
    if (!res.tempFilePath) {
      wx.showToast({ title: '录音为空，请重试', icon: 'none' })
      return
    }
    // 展示原文供对照（个人号无语音识别，不做逐字评分）
    this.setData({
      display: this.data.lines.map((t) => ({ text: t, mark: 'normal' }))
    })
    wx.showToast({ title: '录音完成，可回放对照', icon: 'none' })
  },

  // 回放自评（单实例，支持 播放 / 暂停 / 从暂停处续播，杜绝多实例叠加）
  onPlayRecord() {
    if (!this.data.userAudio) return
    const s = this.data.playState
    if (s === 'playing') {
      this._pauseAudio()      // 正在播放 -> 暂停（保留进度）
    } else if (s === 'paused') {
      this._resumeAudio()     // 已暂停 -> 从暂停处继续
    } else {
      this._playAudio()       // idle -> 从头播放
    }
  },

  _bindAudio(audio) {
    audio.onPlay(() => this.setData({ playState: 'playing' }))
    audio.onTimeUpdate(() => { this._pos = audio.currentTime })
    audio.onEnded(() => {
      this.setData({ playState: 'idle' })
      this._audio = null
      this._pos = 0
    })
    audio.onError(() => {
      this.setData({ playState: 'idle' })
      this._pos = 0
      wx.showToast({ title: '回放失败', icon: 'none' })
    })
  },

  _playAudio() {
    // 先销毁任何旧实例，确保同一时刻只有一个播放器
    this._destroyAudio()
    const audio = wx.createInnerAudioContext()
    this._audio = audio
    this._pos = 0
    audio.src = this.data.userAudio
    this._bindAudio(audio)
    audio.play()
    // 乐观置为播放态，使按钮立即切换，避免连点产生叠加
    this.setData({ playState: 'playing' })
  },

  _pauseAudio() {
    if (this._audio) {
      try { this._pos = this._audio.currentTime } catch (e) {} // 记录当前进度
      try { this._audio.stop() } catch (e) {}                  // 停止播放（保留 _pos）
    }
    this.setData({ playState: 'paused' })
  },

  _resumeAudio() {
    // 重建实例：先 play() 让播放器进入可播放态，再 seek 到断点
    // （InnerAudioContext.seek 必须在播放态才生效，故不能先 seek 后 play）
    const from = this._pos || 0
    this._destroyAudio()
    const audio = wx.createInnerAudioContext()
    this._audio = audio
    audio.src = this.data.userAudio
    this._bindAudio(audio)
    if (from > 0) {
      let applied = false
      audio.onTimeUpdate(() => {
        // 首帧可能尚未应用 seek，播放中再补一次定位，确保从断点续播
        if (!applied && audio.currentTime < from - 0.05) {
          applied = true
          try { audio.seek(from) } catch (e) {}
        }
      })
    }
    audio.play()
    if (from > 0) {
      try { audio.seek(from) } catch (e) {} // play 后紧跟 seek，多数基础库生效
    }
    this.setData({ playState: 'playing' })
  },

  _destroyAudio() {
    if (this._audio) {
      try { this._audio.stop() } catch (e) {}
      try { this._audio.destroy() } catch (e) {}
      this._audio = null
    }
    this.setData({ playState: 'idle' })
    this._pos = 0
  },

  // 打开声纹授权协议
  onOpenAgreement() {
    wx.navigateTo({ url: '/pages/agreement/agreement' })
  },

  onPrev() {
    this._navigate(-1)
  },
  onNext() {
    this._navigate(1)
  },
  _navigate(step) {
    const list = poemsByAuthor[this.data.poem.authorId] || []
    const idx = list.findIndex((p) => p.id === this.data.poem.id)
    const target = list[idx + step]
    if (!target) return
    wx.redirectTo({ url: `/packagePoem/pages/poem/poem?id=${target.id}` })
  },

  onShareAppMessage() {
    return { title: `唐宋八大家 · 《${this.data.poem.title}》` }
  }
})
