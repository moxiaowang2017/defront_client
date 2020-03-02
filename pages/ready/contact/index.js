//index.js
//获取应用实例
const app = getApp()
const companyUtil = require('../../../utils/company.js');
const markUtil = require('../../../utils/markQuestion.js');
var util = require('../../../utils/util.js');
Page({
  data: {
    pageNo: 1,
    pageSize: 15,
    isMark: 0,
    hasData: false,
    hasMarkData:false,
    questionList: [],
    markList:[],
    markNum:0
  },
  searchConcatQuestion(companyId, isMark, pageNo) {
    if (!pageNo) {
      pageNo = this.data.pageNo
    }
    let pageSize = this.data.pageSize;
    companyUtil.searchConcatQuestion(companyId, isMark, pageNo, pageSize).then(res => {
      console.info('res', res);
      if (res.errno == 0) {
        if (res.data.records && res.data.records.length > 0) {
          this.setListData(res.data.records, pageNo)
        }
      }
    }).catch((err) => {
      console.info('err', err)
      util.showErrorToast('数据查询失败：' + err);
    });
  },
  // 初始化数据
  initData(){
    this.setData({
      questionList: [],
      markList: []
    })
  },
  setListData(resList,pageNo){
    console.info('resList', resList)
    if(this.data.pageNo == 1){
      this.initData();
    }
    if(this.data.isMark == 0){
      let oldList = this.data.questionList;
      let newList = oldList.concat(resList)
      this.setData({
        questionList: newList,
        pageNo: pageNo + 1,
        hasData: true
      })
    }else{
      let oldList = this.data.markList;
      let newList = oldList.concat(resList)
      this.setData({
        markList: newList,
        pageNo: pageNo + 1,
        hasMarkData: true
      })
    }
  },
  onLoad(option) {
    let companyId = option.companyId;
    let company = option.company;
    if (!companyId) {
      companyId = -1;
    }
    this.setData({
      companyId: companyId,
      company: company
    })
    this.searchConcatQuestion(companyId)
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.searchConcatQuestion(this.data.companyId, this.data.isMark, 1);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.searchConcatQuestion(this.data.companyId, this.data.isMark);
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
    let curList = this.data.questionList;
    let newList = curList.map(item => {
      if (questionid == item.questionId) {
        return {
          questionId: item.questionId,
          on: true,
          question: item.question,
          type: item.type
        }
      } else {
        return {
          questionId: item.questionId,
          on: item.on ? true : false,
          question: item.question,
          type: item.type
        }
      }
    })
    this.setData({
      questionList: newList
    })
  },
  // 常见问题跳转
  commonClick(e) {
    let questionId = e.currentTarget.dataset.questionid
    wx.navigateTo({
      url: '/pages/ready/personal/index?questionId=' + questionId,
    })
  },
  //是否标注查询
  markSearch(e) {
    let isMark = e.currentTarget.dataset.mark ? parseInt(e.currentTarget.dataset.mark) : 0;
    this.searchConcatQuestion(this.data.companyId, isMark, 1);
    this.getMarkQuestionCount();
    this.setData({
      isMark: isMark,
      pageNo: 1
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
  // 获取当前用户的标注数
  getMarkQuestionCount(){
    markUtil.getMarkQuestionCount().then(res=>{
      console.info('getMarkQuestionCount', res)
      if(res.errno == 0){
        this.setData({
          markNum: res.data
        })
      }
    })
  },
  // 跳转到标注库
  gotoMakeStore(){
    wx.navigateTo({
      url: '/pages/ready/markStore/index',
    })
  },
  // 去问题库标注
  goToQuestionStore(){
    wx.navigateTo({
      url: '/pages/ready/questionStore/index',
    })
  }
})