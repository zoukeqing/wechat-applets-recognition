// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aboutContent: [{
      title: "关于取字识物",
      content: "取字识物 = 取字 + 识物，即为文字识别和图像识别。"
    },{
      title:"关于文字识别",
      content: "支持多场景下的文字检测识别，支持中、英、葡、法、德、意、西、俄、日、韩、中英混合识别，整体识别准确率高达90%以上。"
    },{
      title:"关于图像识别",
      content: "基于大规模图像训练，支持高精准度细粒度图像识别，可进行品牌Logo识别、植物识别、动物识别、菜品识别和车型识别。"
      }, {
        title: "赞助",
        content: "《取字识物》完全免费使用，但需要大家赞助才可使项目继续维护下去。"
    }]
  
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
      title: '传图时刻，得你所见',
      path: '/pages/index/index',
    }
  },
  devoloperWx(){
    wx.setClipboardData({
      data: 'xuanqingse',
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
            wx.showToast({
              title: '复制成功',
            })
          }
        })
      }
    })
  },
  supportMe(){
    wx.navigateToMiniProgram({
      appId: 'wx18a2ac992306a5a4',
      path: "pages/apps/largess/detail?accountId=2348136"
    }) 
  }
})