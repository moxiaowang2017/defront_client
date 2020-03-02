// pages/more/index.js
const app = getApp()
var publishUtil = require('../../../utils/publish.js');
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNo:1,
    pageSize:10,
    articleList:[],
    hasData:false
  },
  // 列表点击事件
  detailContent(e){
    let detailId = e.currentTarget.dataset.detailid;
    wx.navigateTo({
      url: '/pages/more/articleDetail/index?detailId=' + detailId,
    })
  },
  searchArticle(pageNo){
    if(!pageNo){
      pageNo = this.data.pageNo;
    }
    let pageSize = this.data.pageSize;
    publishUtil.searchArticle(pageNo,pageSize).then(res=>{
      console.info('searchArticle',res);
      if (res.errno == 0){
        if (res.data.records && res.data.records.length>0){
          let oldList = this.data.articleList;
          let newList = oldList.concat(res.data.records)
          this.setData({
            articleList: newList,
            pageNo:pageNo+1,
            hasData:true
          })
        }
      }else{
        util.showErrorToast('查询失败！')
      }
    }).catch((err) => {
      console.info('err', err)
      util.showErrorToast('数据查询失败：' + err);
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.searchArticle()
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