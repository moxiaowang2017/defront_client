// pages/publish/index.js
//index.js
//获取应用实例
const app = getApp()
var publishUtil = require('../../utils/publish.js');
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo: 1,
    pageSize: 5,
    publishList: [],
    hasData: false,
    hasClicksMap: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let me = options.me;
    this.setData({
      me: me
    })
    this.search()
  },
  search(pageNo) {
    let me = this.data.me;
    if (me == 1) {
      this.searchPublishByUserId(pageNo)
    } else {
      this.searchPublish(pageNo);
    }
  },
  searchPublishByUserId(pageNo) {
    if (!pageNo) {
      pageNo = this.data.pageNo;
    }
    let pageSize = this.data.pageSize;
    publishUtil.searchByUserId(pageNo, pageSize).then(res => {
      console.info('searchPublish', res);
      if (res.errno == 0) {
        let oldList = this.data.publishList;
        if (res.data.records && res.data.records.length > 0) {
          let newList = oldList.concat(res.data.records);
          this.setData({
            publishList: newList,
            pageNo: pageNo + 1,
            hasData: true
          })
        }
      }
    })
  },
  searchPublish(pageNo) {
    if (!pageNo) {
      pageNo = this.data.pageNo;
    }
    let pageSize = this.data.pageSize;
    publishUtil.search(pageNo, pageSize).then(res => {
      console.info('searchPublish', res);
      if (res.errno == 0) {
        let oldList = this.data.publishList;
        if (res.data.records && res.data.records.length > 0) {
          let newList = oldList.concat(res.data.records);
          this.setData({
            publishList: newList,
            pageNo: pageNo + 1,
            hasData: true
          })
        }
      }
    })
  },

  /**
   * 点赞
   */
  insertClicks(e) {
    let concatId = e.currentTarget.dataset.id;
    publishUtil.insertClicks(concatId).then(res => {
      console.info('insertClicks', res)
      let map = this.data.hasClicksMap;
      if (res.errno == 0) {
        if (!map[concatId]) {
          map[concatId] = true;
          this.setData({
            hasClicksMap: map
          })
        }
      }
    })
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
    this.setData({
      questionList: []
    })
    this.search(1)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.search()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})