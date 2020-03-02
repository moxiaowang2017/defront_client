// pages/ready/markStore/index.js
const app = getApp()
const markUtil = require('../../../utils/markQuestion.js');
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markList:[],
    hasMarkData: false,
    pageNo:1,
    pageSize:15
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.searchMarkQuestion()
  },
  searchMarkQuestion(pageNo) {
    if (!pageNo) {
      pageNo = this.data.pageNo
    }
    let pageSize = this.data.pageSize;
    markUtil.search('',pageNo, pageSize).then(res => {
      console.info('res', res);
      if (res.records && res.records.length > 0) {
        this.setListData(res.records, pageNo)
      }
    }).catch((err) => {
      console.info('err', err)
      util.showErrorToast('数据查询失败：' + err);
    });
  },
  setListData(resList, pageNo) {
    let oldList = this.data.markList;
    let newList = oldList.concat(resList)
    console.info('newList', newList)
    this.setData({
      markList: newList,
      pageNo: pageNo + 1,
      hasMarkData: true
    })
  },
  // 取消标注
  gotoCancel(e) {
    let questionId = e.currentTarget.dataset.questionid;
    markUtil.deleteByQuestionId(questionId).then(res => {
      console.info('deleteByQuestionId', res);
      if (res.errno == 0) {
        let newList = this.data.markList.filter(item => {
          return item.questionId != questionId
        })
        this.setData({
          markList: newList
        })
      } else {
        util.showErrorToast("取消失败" + res.errmsg)
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.searchMarkQuestion();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})