# SignCollect 签名收集小程序
利用<canvas>绘制签名

index.wxml
<canvas canvas-id="signCanvas" class="canvas" disable-scroll="false" bindtouchstart="touchStart" bindtouchmove="touchMove" bindtouchend="touchEnd" />

index.js
// 手指触摸动作开始
  touchStart: function (e) {
    this.startX = e.changedTouches[0].x
    this.startY = e.changedTouches[0].y
    this.context = wx.createContext()
    this.context.setLineWidth(4)
    this.context.setLineCap('round')
    this.context.beginPath()
  },

  // 手指触摸后移动
  touchMove: function (e) {
    var startX1 = e.changedTouches[0].x
    var startY1 = e.changedTouches[0].y
    this.context.moveTo(this.startX, this.startY)
    this.context.lineTo(startX1, startY1)
    this.context.stroke()
    this.startX = startX1;
    this.startY = startY1;
    wx.drawCanvas({
      canvasId: 'signCanvas',
      reserve: true,
      actions: this.context.getActions()
    })
  },

  // 手指触摸动作结束
  touchEnd: function (e) {

  }