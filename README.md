# SignCollect 签名收集小程序

![](https://github.com/huangyu0522/SignCollect/blob/master/sign.png)

程序简介：

由于项目需要，事先采集客户的电子签名，用于在Word文档中制作电子签章。大概花了一天多的时间制作本小程序，也熟悉一下小程序的开发流程。

![](https://github.com/huangyu0522/SignCollect/blob/master/%E7%A4%BA%E6%84%8F%E5%9B%BE.png)

总体思路：

非常简单，几十行代码即可。利用<canvas>绘图，<input>输入信息，<form>表单配合<button>提交到Bmob后端云后台。

1. 利用<canvas>绘制签名


    <canvas canvas-id="signCanvas" class="canvas" disable-scroll="false" bindtouchstart="touchStart" bindtouchmove="touchMove" bindtouchend="touchEnd" />

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
    
    // 暂存canvas图片：
    wx.canvasToTempFilePath()

2. 表单数据的获取和提交

        // form的bindsubmit和bindreset方法绑定事件

        <form class="form" bindsubmit="submit" bindreset="clear">
        
        // 对应button的formType（submit或reset）
        <button type="primary" formType="submit" class='btnSubmit' disabled="{{disabled}}" loading="{{loading}}"> 提交 </button>
        <button type="default" class="btnClear" formType="reset"> 重签 </button>
        
        // input标签里用name标志输入内容
    
        <input class="inputText" name="no" focus="true" type="number" />
        <input class="inputText" name="content" />

        // 在<button>提交方法submit里用e.detail.value.###获取<input>输入的值
    
        submit: function (e) {
    
        // 获取警号
        var no = e.detail.value.no
    
        // 获取用户名
        var username = e.detail.value.content
        
        ...
        
        }

3. Bmob后端云

    初始化：
    
    var Bmob = require('../../utils/bmob.js')
    
    Bmob.initialize("", "")
    
    上传：
    
    var file = new Bmob.File(photoname, tempFilePath);
    
    file.save().then(function (res) {
          
    }, function (error) {
          
    })
    
**Done.**
    
    
