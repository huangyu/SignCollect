//index.js
//获取应用实例
var app = getApp()
var Bmob = require('../../utils/bmob.js')
// 使用自己的Bmobid替换如下
Bmob.initialize("", "")
Page({
  data: {
    disabled: false,
    loading: false
  },

  // 提交按钮事件
  submit: function (e) {
    var no = e.detail.value.no
    var username = e.detail.value.content
    var name = no + " - " + username + ".png"

    this.setData({
      disabled: !this.data.disabled
    })
    this.setData({
      loading: !this.data.loading
    })

    var that = this

    // 保存照片
    wx.canvasToTempFilePath({
      canvasId: 'signCanvas',
      success: function (res) {
        var photoname = Math.random().toString(36).substr(2) + ".png"
        var tempFilePath = [res.tempFilePath];
        var file = new Bmob.File(photoname, tempFilePath);
        file.save().then(function (res) {
          // 添加照片数据
          var Photo = Bmob.Object.extend("Photo");
          var photo = new Photo();
          var url = res.url();
          photo.save({
            name: name,
            url: url
          }, {
              success: function (result) {
                wx.showToast({
                  title: "提交成功！",
                  icon: 'success',
                  duration: 2000
                })
                that.setData({
                  disabled: !that.data.disabled
                })
                that.setData({
                  loading: !that.data.loading
                })
              },
              error: function (result, error) {
                wx.showToast({
                  title: "提交失败！照片数据保存失败！",
                  icon: 'success',
                  duration: 2000
                })
                that.setData({
                  disabled: !that.data.disabled
                })
                that.setData({
                  loading: !that.data.loading
                })
              }
            });

        }, function (error) {
          wx.showToast({
            title: "提交失败！照片文件保存失败！",
            icon: 'success',
            duration: 2000
          })
          that.setData({
            disabled: !that.data.disabled
          })
          that.setData({
            loading: !that.data.loading
          })
        })
      },
      fail: function () {
        wx.showToast({
          title: "提交失败！绘图保存失败！",
          icon: 'success',
          duration: 2000
        })
        that.setData({
          disabled: !that.data.disabled
        })
        that.setData({
          loading: !that.data.loading
        })
      }
    })
  },

  // 重签按钮事件
  clear: function (e) {
    wx.drawCanvas({
      canvasId: 'signCanvas',
      actions: [],
      reserve: false
    });
  },

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
})
