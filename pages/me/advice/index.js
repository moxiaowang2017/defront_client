// pages/me/advice/index.js
var publishUtil = require('../../../utils/publish.js');
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 表单提交
  bindFormSubmit(e){
    let advice = e.detail.value.advice;
    let obj = {
      advice: advice
    }
    publishUtil.insertAdvice(obj).then(res=>{
      console.info('insertAdvice', res);
      if(res.errno == 0){
        util.showSuccessToast("添加成功！")
        wx.navigateBack({
          delta: 1
        })
      }else{
        util.showSuccessToast("添加失败！")
      }
    }).catch((err) => {
      console.info('err', err)
      util.showErrorToast('添加失败！' + err);
    });
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

  }
})