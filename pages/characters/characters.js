// pages/characters/characters.js
const app = getApp();
const host = app.config.host;
const ts = require("../../utils/libs/md5.js")

var texts = new Array();
var n = new Array();
// 点击次数
var p = -1;

// 排序函数
function sortNum(a,b){
  return a-b;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageFile:'',
    wordsData:{},
    text: '',
    texts:'',
    pitchOn:[0],
    ratio:1,
    q:1,
    cardOut:0,
    index:0,
    tranArray: ['中文', '英语', '粤语', '文言文', '日语', '韩语', '法语', '西班牙语', '泰语', '阿拉伯语', '俄语', '葡萄牙语', '德语', '意大利语', '希腊语', '荷兰语', '波兰语', '保加利亚语', '爱沙尼亚语', '丹麦语', '芬兰语', '捷克语', '罗马尼亚语', '斯洛文尼亚语', '瑞典语', '匈牙利语', '繁体中文','越南语'],
    tranType:['zh','en','yue','wyw','jp','kor','fra','spa','th','ara','ru','pt','de','it','el','nl','pl','bul','est','dan','fin','cs','rom','slo','swe','hu','cht','vie'],
    tranText:''
  },
  extraLine:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options); 
    // console.log(decodeURIComponent(options.wordsData));
    var pitchNum = JSON.parse(decodeURIComponent(options.wordsData)).words_result_num;
    for (var i = 0; i < pitchNum;i++){
      this.data.pitchOn[i] = 0;
      texts[i] = JSON.parse(decodeURIComponent(options.wordsData)).words_result[i].words
    };
    console.log(this.data.pitchOn);
    var ratio = 750/options.width;
    this.setData({
      imageFile: options.imageFile,
      wordsData: JSON.parse(decodeURIComponent(options.wordsData)),
      ratio:ratio
    });

  },
  onUnload:function(){
    texts = new Array;
    n = new Array;
    console.log(texts)
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
  // 选中
  pitchOn(res){
    // console.log(res);
    var index = res.target.id;
    // 全选反选切换
    var q = 1;
    if (this.data.pitchOn[index] == 0){
      p++;
      n[p] = index;
      if(n.length>1){
        n.sort(sortNum);
      }
      for(var i=0;i<n.length;i++){
        if(n[i] == index){
          this.extraLine.splice(i, 0, texts[index]);
        }
      };
      this.data.pitchOn[index] = 1;
    }else{
      console.log('n:'+n)
      for (var i = 0; i < n.length; i++) {
        if (n[i] == index) {
          this.extraLine.splice(i, 1);
          n.splice(i,1);
        }
      };
      p--;
      this.data.pitchOn[index] = 0;
    };
    if(this.extraLine.length == texts.length){
      q = 0;
    };
    var textsLine = this.extraLine.join('')
    this.setData({
      pitchOn: this.data.pitchOn,
      text: this.extraLine.join('\n'),
      q:q,
      texts: textsLine
    });
  },
  // 全选反选
  checkAll(){
    var q = 1;
    if(this.extraLine.length < texts.length){
      this.extraLine = [];
      for (var i = 0; i < texts.length; i++) {
        this.extraLine.push(texts[i]);
        this.data.pitchOn[i] = 1;
        n[i] = i;
      };
      p = texts.length-1;
      q = 0;
      wx.showToast({
        title: '全选成功',
      })
    }else{
      p = -1;
      n = [];
      this.extraLine = [];
      for (var i = 0; i < texts.length; i++) {
        this.data.pitchOn[i] = 0;
      };
      wx.showToast({
        title: '取消全选',
      });
      
    }
    var textsLine = this.extraLine.join('')
    this.setData({
      text:this.extraLine.join('\n'),
      pitchOn: this.data.pitchOn,
      q:q,
      texts:textsLine
    })
  },
  // 复制
  copy(){
    if (this.data.text != '选择你想要的可编辑的文字'){
      wx.setClipboardData({
        data: this.data.text,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              console.log(res.data) // data
              if(res.data != ''){
                wx.showToast({
                  title: '复制成功',
                })
              }else{
                wx.showToast({
                  title: '复制不能为空',
                  icon:'none'
                })
              }
              
            }
          })
        }
      })
    }else{
      wx.showToast({
        title: '未选中文字',
        icon:'none'
      })
    }
  },
  // 排序函数
  sortNum(a,b){
    return a-b;
  },
  // 百度翻译
  translate(text,langeType) {
    var that = this;
    text = text.split('\n').join('  ')
    console.log(text);
    //获取接口
    var value = 'https://fanyi-api.baidu.com/api/trans/vip/translate?';
    //获取当前时间
    var date = Date.now();
    //此处拼接接口数据,好转换成jsonp数据格式,实现跨域访问
    var str = '20180309000133646' + text + date + 'OuEAnh3yeQhTjjAigoee';
    //使用加密算法计算数据
    var md5 = ts.MD5(str);
    //然后得到的数据
    var data = 'q=' + text + '&from=auto&to=' + langeType + '&appid=20180309000133646' + '&salt=' + date + '&sign=' + md5;
    //引入src路径
    var src = value + data;
    //调用创建script标签函数
    console.log(src)
    // createScript(src);
    wx.request({
      url: src,
      method:'POST',
      success(res) {
        console.log(res)
        console.log(res.data.trans_result[0].dst)
        that.setData({
          tranText: res.data.trans_result[0].dst.split('  ').join('\n')
        })
      }
    })
  },
  // 点击翻译
  translateBtn(){
    this.setData({
      cardOut:1
    })
  },
  translateClose(){
    this.setData({
      cardOut: 0
    })
  },
  // 原文失去焦点出发
  cardTextareaBlur(e){
    this.setData({
      texts:e.detail.value
    })
  },
  //卡片翻译
  bindPinckerChange(e){
    console.log(e)
    var texts = this.data.texts;
    var tranType = this.data.tranType[e.detail.value]
    this.translate(texts,tranType);
    this.setData({
      index:e.detail.value,
    })
  },
  // 复制译文
  copyTran(){
    var tranText = this.data.tranText;
    if (tranText != ''){
      wx.setClipboardData({
        data: tranText,
        success(res){
          wx.showToast({
            title: '复制译文成功',
          })
        }
      })
    }else{
      wx.showToast({
        title: '复制为空',
        icon: 'none'
      })
    }
  },
  cardClose(){
    this.setData({
      cardOut: 0
    })
  }
})