// pages/me/myQuestion/index.js
const app = getApp()
const trainingUtil = require('../../../utils/training.js');
const util = require('../../../utils/util.js');
const param = require('../../../config/param.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo:1,
    pageSize:20,
    questionList:[],
    categoryEum: param.QuestionCategory
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type;
    this.setData({
      type: type
    })
    this.queryDoQuestion()
  },
  queryDoQuestion(pageNo){
    if (!pageNo){
      pageNo = this.data.pageNo;
    }
    let pageSize = this.data.pageSize;
    let type = this.data.type;
    trainingUtil.queryDoQuestion(type,pageNo,pageSize).then(res=>{
      if(res.errno == 0){
        if (res.data.records && res.data.records.length>0){
          let oldList = this.data.questionList;
          let newList = oldList.concat(res.data.records);
          this.setData({
            questionList: newList,
            pageNo: pageNo + 1,
            hasData:true
          })
        }else{
          if(pageNo == 1){
            this.setData({
              hasData:false
            })
          }
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
    this.queryDoQuestion(1);
    this.setData({
      pageNo: 1
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.queryDoQuestion();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})