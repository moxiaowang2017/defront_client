// pages/ready/personal/index.js
const app = getApp()
const questionUtil = require('../../../utils/question.js');
const personalQuestionUtil = require('../../../utils/personalQuestion.js');
const util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commonQuestion: {}
  },
  changeInput(e) {
    this.setData({
      myAnswer: e.detail.value
    })
  },
  changeKeywords(e) {
    this.setData({
      keywords: e.detail.value
    })
  },
  // 保存个人常见问题
  insertPersonal(e) {
    personalQuestionUtil.insert({
      id: this.data.id,
      commonId: this.data.commonQuestion.id,
      keywords: this.data.keywords,
      myAnswer: this.data.myAnswer,
      question: this.data.commonQuestion.question,
    }).then(res => {
      console.info('insert', res)
      if (res.errno == 0) {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 3000
        });
        wx.navigateBack({
          delta: 1
        })
      }
    }).catch((err) => {
      console.info('err', err)
      util.showErrorToast('数据查询失败：' + err);
    });
  },
  checkboxChange(e) {
    console.info('checkboxChange', e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let questionId = options.questionId
    console.info('questionId', questionId)
    questionUtil.getOneCommonQuestion(questionId).then(res => {
      console.info('res', res)
      this.setData({
        commonQuestion: res.data
      })
    }).catch((err) => {
      console.info('err', err)
      util.showErrorToast('数据查询失败：' + err);
    });

    questionUtil.getOnePersonalQuestion(questionId).then(res => {
      console.info('res', res);
      if (res.errno == 0 && res.data && res.data.length > 0) {
        this.setData({
          myAnswer: res.data[0].myAnswer,
          id: res.data[0].id,
          keywords: res.data[0].keywords,
        })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})