//index.js
//获取应用实例
const app = getApp()
var user = require('../../utils/user.js');
var util = require('../../utils/util.js');
var filterUtil = require('../../utils/filter.js');

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    grids: [{ name: '面试中', url: '/pages/interview/index', imgUrl:'/images/index/banner1.png' },
      { name: '准备面试', url: '/pages/ready/index/index', imgUrl: '/images/index/banner2.png'},
      { name: '练习', url: '/pages/training/index/index', imgUrl: '/images/index/banner3.png'},
      { name: '轻松一刻', url: '/pages/publish/index', imgUrl: '/images/index/banner4.png'},
      { name: '更多', url: '/pages/more/index/index', imgUrl: '/images/index/banner5.png'},
      { name: '分享', url: 'pages/interview/index', imgUrl: '/images/index/banner6.png' },
      ]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.setData({
      dateItem: util.getCurDate()
    })
    
  },
  gotoUrl(e){
    let url = e.currentTarget.dataset.url;
    filterUtil.routeFilter(app,url)
  },

  onShareAppMessage: function (res) {
    // if (res.from === 'button') { }
    return {
      title: '转发',
      path: '/pages/index/index',
      success: function (res) { }
    }
  }
})
