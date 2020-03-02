// pages/me/interviewRecord/index.js
// pages/me/index.js
var companyUtil = require('../../../utils/company.js');
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    interviewList:[],
    pageNo:1,
    pageSize:10
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
  initData(){
    this.setData({
      interviewList:[],
      pageNo:1
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.initData();
    this.getinterviewRecords()
  },
  getinterviewRecords(pageNo){
    if (!pageNo) {
      pageNo = this.data.pageNo;
    }
    let pageSize = this.data.pageSize;
    companyUtil.getInterviewRecords().then(res => {
      console.info('getInterviewRecords', res)
      if (res.errno == 0) {
        if (res.data.records && res.data.records.length > 0) {
          let oldList = this.data.interviewList;
          let newList = oldList.concat(res.data.records);
          this.setData({
            interviewList: newList,
            hasData: true
          })
        }
      }
    })
  },
  // 去评价
  gotoReview(e){
    let company = e.currentTarget.dataset.company;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/ready/company/index?company=' + company + '&recordId=' + id,
    })
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

  }
})