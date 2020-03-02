// pages/me/index.js
var publishUtil = require('../../../utils/publish.js');
var companyUtil = require('../../../utils/company.js');
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isClock: false,
    unreviewCount: 0,
    totalNum: 0,
    errorNum: 0
  },
  // 到我的练习题
  goToMyQuestion(e){
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/me/myQuestion/index?type=' + type
    });
  },
  goToEditor(){
    wx.navigateTo({
      url: '/pages/me/editor/editor?category=打卡'
    });
  },
  // 打完卡直接到打卡记录
  goToPublish(){
    wx.navigateTo({
      url: '/pages/publish/index?me=1'
    });
  },
  // 获取我的页面的数据统计
  getMyCount(){
    publishUtil.getMyCount().then(res => {
      console.info('getMyCount', res)
      if (res.errno == 0) {
        this.setData({
          isClock: res.data.clock,
          unreviewCount: res.data.unreviewCount,
          totalNum: res.data.totalNum,
          errorNum: res.data.errorNum,
        })
      }
    })
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
    this.getMyCount()
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') { }
    return {
      title: 'web前端远程面试',
      path: '/pages/index/index',
      success: function (res) { }
    }
  }
})