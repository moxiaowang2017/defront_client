// pages/ready/questionStore/index.js
const app = getApp()
var questionUtil = require('../../../utils/question.js');
const markUtil = require('../../../utils/markQuestion.js');
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flexs: [{
      name: 'js',
      on: true,
      val: '1'
    },
    {
      name: 'css',
      on: false,
      val: '2'
    },
    {
      name: 'html',
      on: false,
      val: '3'
    },
    {
      name: 'es6',
      on: false,
      val: '4'
    },
    {
      name: 'vue',
      on: false,
      val: '5'
    },
    {
      name: 'nodejs',
      on: false,
      val: '6'
    }
    ],
    inputShowed: false,
    inputVal: "",
    pageSize:15,
    pageNo:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.questionSearch(1)
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  //类型转换
  changeType(e) {
    let type = e.currentTarget.dataset.type;
    var flexs = this.data.flexs;
    for (var i = 0, len = flexs.length; i < len; ++i) {
      flexs[i].on = (flexs[i].val == type);
    }
    this.setData({
      flexs: flexs,
      type: type
    })
    this.questionSearch(type, 1)
  },

  questionSearch(type, pageNo) {
    if (!pageNo) {
      pageNo = this.data.pageNo;
    }
    let pageSize = this.data.pageSize;
    questionUtil.searchNoMark(type, this.data.inputVal, pageNo, pageSize).then(res => {
      console.info('res', res)
      this.setData({
        records: res.records
      })
      this.setHasData(res.records)
    }).catch((err) => {
      console.info('err', err)
      util.showErrorToast('数据查询失败：' + err);
    });
  },

  // 标注
  gotoPractice(e) {
    let type = e.currentTarget.dataset.type
    if (!parseInt(type)) {
      util.showErrorToast('当前问题无法标注,请到常见问题那边添加！');
      return;
    }
    let questionId = e.currentTarget.dataset.questionid;
    markUtil.insertByQuestionId(questionId).then(res => {
      console.info('insertByQuestionId', res)
      if (res.errno == 0) {
        util.showSuccessToast("标注成功！")
        this.labelOn(questionId)
      } else {
        util.showErrorToast("标注失败：" + res.errmsg)
      }
    }).catch((err) => {
      console.info('err', err)
      util.showErrorToast('标注失败：' + err);
    });
  },
  labelOn(questionid) {
    let curList = this.data.records;
    let newList = curList.map(item => {
      if (questionid == item.id) {
        return {
          id: item.id,
          on: true,
          question: item.question,
          type: item.type
        }
      } else {
        return {
          id: item.id,
          on: item.on ? true : false,
          question: item.question,
          type: item.type
        }
      }
    })
    this.setData({
      records: newList
    })
  },
  setHasData(r) {
    if (r.length > 0) {
      this.setData({
        hasData: true
      })
    } else {
      this.setData({
        hasData: false
      })
    }
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