Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageFile: '',
    wordsData: {},
    wordsResult:[],
    showCanvas: 0,
    cWidth: 0,
    cHeight: 0,
    screenScale: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.stringify(options));
    var that = this;
    var wordsResult = JSON.parse(options.wordsData).result
    console.log(wordsResult instanceof Array);
    if (wordsResult instanceof Array){
      for (var i = 0; i < wordsResult.length; i++) {
        wordsResult[i].score = (wordsResult[i].score * 100).toFixed(2);
      }
    } else if (wordsResult instanceof Object){
      var sNum = (wordsResult.score * 100).toFixed(2);
      wordsResult = [{
        score: sNum,
        name:"非植物"
      }]
    }
    console.log(wordsResult)
    this.setData({
      imageFile: options.imageFile,
      wordsData: options.wordsData,
      wordsResult: wordsResult
    })
    this.setData({
      imageFile: options.imageFile,
      wordsData: options.wordsData,
      wordsResult: wordsResult
    })
    wx.getImageInfo({
      src: options.imageFile,
      success(res) {
        var hw = res.height / res.width;
        wx.getSystemInfo({
          success: function (res) {
            that.setData({
              cWidth: res.screenWidth * 700 / 750,
              cHeight: res.screenWidth * 700 / 750 * hw,
              screenScale: res.screenWidth / 320
            })
          },
        })

      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '植物识别',
      path: '/pages/index/index',
    }
  },
  shareCanvas() {
    var that = this;
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {

            },
            fail() {
              wx.showModal({
                title: '微信授权',
                content: '生成失败，未授权保存到相册，是否需要确定设置授权',
                success(res) {
                  if (res.confirm) {
                    wx.openSetting({
                      success(res) {
                        console.log(res)
                        if (res.authSetting['scope.writePhotosAlbum']) {
                          wx.showToast({
                            title: '微信授权成功'
                          })
                        } else if (!res.authSetting['scope.writePhotosAlbum']) {
                          wx.showToast({
                            title: '未授权',
                            icon: 'none'
                          })
                        }
                      }
                    })
                  } else if (res.cancel) {
                    wx.showToast({
                      title: '取消设置授权',
                      icon: 'none'
                    })
                  }
                }
              })
            }
          })
        } else {
          that.setData({
            showCanvas: 1
          });
          var imageF = that.data.imageFile, w = that.data.cWidth, h = that.data.cHeight;

          var date = new Date();
          var year = date.getFullYear()
          var month = date.getMonth() + 1
          var day = date.getDate()
          var hour = date.getHours()
          var minute = date.getMinutes();
          if (minute < 10) {
            minute = "0" + minute;
          }
          var currentdate = year + "-" + month + "-" + day + " " + hour + ":" + minute;

          const ctx = wx.createCanvasContext('shareCanvas')
          ctx.drawImage(imageF, 0, 0, w, h)
          // 比例
          var sc = that.data.screenScale
          // logo
          ctx.drawImage('../../assets/ma_logo.png', 10 * sc, 5 * sc, 45 * sc, 45 * sc)
          ctx.setFontSize(12 * sc);
          ctx.setFillStyle('#fff');
          ctx.fillText('取字识物', 60 * sc, 32 * sc);
          ctx.setFontSize(9 * sc);
          ctx.fillText(currentdate, 60 * sc, 45 * sc);
          var wordsResult = that.data.wordsResult;
          var num = wordsResult.length - 1;
          var i = 0;
          while (num >= 0) {
            ctx.fillText(wordsResult[num].name, 10 * sc, h * 0.95 - 15 * i * sc);
            ctx.fillText(wordsResult[num].score + '%', 70 * sc, h * 0.95 - 15 * i * sc);
            num--;
            i++;
          }
          ctx.fillText('名称：', 10 * sc, h * 0.95 - 15 * i * sc);
          ctx.fillText('置信度：', 70 * sc, h * 0.95 - 15 * i * sc)
          ctx.draw()
        }
      }
    })
  },
  cancel() {
    this.setData({
      showCanvas: 0
    })
    wx.showToast({
      title: '取消保存',
      icon: 'none'
    })
  },
  save() {
    wx.canvasToTempFilePath({
      canvasId: 'shareCanvas',
      success: function (res) {
        console.log(res.tempFilePath);
        var image = res.tempFilePath
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        })
      }
    })
    this.setData({
      showCanvas: 0
    })
    wx.showToast({
      title: '已保存到相册',
    })
  }
})