//index.js
//获取应用实例
const app = getApp();
const host = app.config.host;

current:()=>{
  return parseInt(Math.random()*5)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrls:[
      '../../assets/1.jpg',
      '../../assets/2.jpg',
      '../../assets/3.jpg',
      '../../assets/4.jpg',
      '../../assets/5.jpg',
    ],
    current:app.current()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '取字识物',
      path: '/pages/index/index',
    }
  },
  // 图标可点击
  iconTab:()=>{
    wx.showActionSheet({
      itemList: ['取字+翻译', '植物识别', '动物识别','车型识别','菜品识别','品牌LOGO识别'],
      success:res=>{
        // 文字识别
        if(res.tapIndex == 0){
          wx.chooseImage({
            count: 1,
            sizeType: 'original',
            success: function (res) {
              var imageFile = res.tempFilePaths[0];
              wx.showLoading({
                title: '正在解析中...',
                mask:true,
              });
              wx.getImageInfo({
                src: imageFile,
                success(res){
                  var width = res.width;
                  wx.uploadFile({
                    url: `https://${host}/characters/assets`,
                    filePath: imageFile,
                    name: 'characters',
                    success(res) {
                      console.log("上传图片成功",res.data);
                      if (res.statusCode == 200) {
                        wx.navigateTo({
                          url: '../characters/characters?imageFile=' + imageFile + '&width=' + width + '&wordsData=' + encodeURIComponent(res.data)
                        })
                        wx.hideLoading();
                      }
                    },
                    fail(err) {
                      console.log('上传失败',err);
                      wx.showModal({
                        title: '',
                        content: '上传图片超时，请重试',
                        showCancel: false
                      });
                      wx.hideLoading();
                    }
                  })
                }
              })

            },
          })
        }else if(res.tapIndex == 1){
          //植物识别
          wx.chooseImage({
            count: 1,
            sizeType: 'original',
            success: function (res) {
              let imageFile = res.tempFilePaths[0];
              wx.showLoading({
                title: '正在解析中...',
                mask: true,
              });
              wx.uploadFile({
                url: `https://${host}/plant/assets`,
                filePath: imageFile,
                name: 'plant',
                success(res) {
                  // console.log("上传图片成功" + JSON.stringify(res));
                  if (res.statusCode == 200) {
                    wx.navigateTo({
                      url: '../plant/plant?imageFile=' + imageFile + '&wordsData=' + res.data,
                    })
                    wx.hideLoading();
                  }
                },
                fail(err) {
                  console.log('上传失败' + err);
                  wx.showModal({
                    title: '',
                    content: '上传图片超时，请重试',
                    showCancel: false
                  });
                  wx.hideLoading();
                }
              })
            },
          })
        }else if(res.tapIndex == 2){
          // 动物识别
          wx.chooseImage({
            count: 1,
            sizeType: 'original',
            success: function (res) {
              let imageFile = res.tempFilePaths[0];
              wx.showLoading({
                title: '正在解析中...',
                mask: true,
              });
              wx.uploadFile({
                url: `https://${host}/animal/assets`,
                filePath: imageFile,
                name: 'animal',
                success(res) {
                  console.log("上传图片成功" + JSON.stringify(res));
                  if (res.statusCode == 200) {
                    wx.navigateTo({
                      url: '../animal/animal?imageFile=' + imageFile + '&wordsData=' + res.data,
                    })
                    wx.hideLoading();
                  }
                },
                fail(err) {
                  console.log('上传失败' + err);
                  wx.showModal({
                    title: '',
                    content: '上传图片超时，请重试',
                    showCancel: false
                  });
                  wx.hideLoading();
                }
              })
            },
          })
        } else if (res.tapIndex == 3) {
          // 车型识别
          wx.chooseImage({
            count: 1,
            sizeType: 'original',
            success: function (res) {
              let imageFile = res.tempFilePaths[0];
              wx.showLoading({
                title: '正在解析中...',
                mask: true,
              });
              wx.uploadFile({
                url: `https://${host}/car/assets`,
                filePath: imageFile,
                name: 'car',
                success(res) {
                  console.log("上传图片成功" + JSON.stringify(res));
                  if (res.statusCode == 200) {
                    wx.navigateTo({
                      url: '../car/car?imageFile=' + imageFile + '&wordsData=' + res.data,
                    })
                    wx.hideLoading();
                  }
                },
                fail(err) {
                  console.log('上传失败' + err);
                  wx.showModal({
                    title: '',
                    content: '上传图片超时，请重试',
                    showCancel: false
                  });
                  wx.hideLoading();
                }
              })
            },
          })

        } else if (res.tapIndex == 4) {
          // 菜品识别
          wx.chooseImage({
            count: 1,
            sizeType: 'original',
            success: function (res) {
              let imageFile = res.tempFilePaths[0];
              wx.showLoading({
                title: '正在解析中...',
                mask: true,
              });
              wx.uploadFile({
                url: `https://${host}/dishes/assets`,
                filePath: imageFile,
                name: 'dishes',
                success(res) {
                  console.log("上传图片成功" + JSON.stringify(res));
                  if (res.statusCode == 200) {
                    wx.navigateTo({
                      url: '../dishes/dishes?imageFile=' + imageFile + '&wordsData=' + res.data,
                    })
                    wx.hideLoading();
                  }
                },
                fail(err) {
                  console.log('上传失败' + err);
                  wx.showModal({
                    title: '',
                    content: '上传图片超时，请重试',
                    showCancel: false
                  });
                  wx.hideLoading();
                }
              })
            },
          })
        } else if (res.tapIndex == 5) {
          // LOGO商标识别
          wx.chooseImage({
            count: 1,
            sizeType: 'original',
            success: function (res) {
              let imageFile = res.tempFilePaths[0];
              wx.showLoading({
                title: '正在解析中...',
                mask: true,
              });
              wx.uploadFile({
                url: `https://${host}/logo-search/assets`,
                filePath: imageFile,
                name: 'logo-search',
                success(res) {
                  console.log("上传图片成功" + JSON.stringify(res));
                  if (res.statusCode == 200) {
                    wx.navigateTo({
                      url: '../logo-search/logo-search?imageFile=' + imageFile + '&wordsData=' + res.data,
                    })
                    wx.hideLoading();
                  }
                },
                fail(err) {
                  console.log('上传失败' + err);
                  wx.showModal({
                    title: '',
                    content: '上传图片超时，请重试',
                    showCancel: false
                  });
                  wx.hideLoading();
                }
              })
            },
          })
        }
      }
    })
    
  },
  // 支持开发者
  developerNavigate:()=>{
    wx.navigateToMiniProgram({
      appId: 'wx18a2ac992306a5a4',
      path:"pages/apps/largess/detail?accountId=2348136"
    })  
  },
  // 关于传图刻字
  aboutTab:()=>{
    wx.navigateTo({
      url: '../about/about'
    })
  }
})
