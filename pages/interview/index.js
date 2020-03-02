//index.js
//获取应用实例
const app = getApp()
var questionUtil = require('../../utils/question.js');
var personalQuestionUtil = require('../../utils/personalQuestion.js');
var markQuestionUtil = require('../../utils/markQuestion.js');
var companyUtil = require('../../utils/company.js');
var util = require('../../utils/util.js');
var WxParse = require('../../components/wxParse/wxParse.js');

Page({
  data: {
    flexs: [{
      name: '常见问题',
      on: true,
      val: 'common'
    },
    {
      name: '标注',
      on: false,
      val: 'mark'
    }, {
      name: 'js',
      on: false,
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
    hasData: true,
    questionPageNo: 1,
    markPageNo: 1,
    personPageNo: 1,
    pageSize: 15,
    questionList: [],
    isFinish: false,
    finishButton:true,
    type:'common',
    records:[]
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
    this.initData();
    let type = e.currentTarget.dataset.type;
    var flexs = this.data.flexs;
    for (var i = 0, len = flexs.length; i < len; ++i) {
      flexs[i].on = (flexs[i].val == type);
    }
    this.setData({
      flexs: flexs,
      type: type
    })
    this.search(type)
  },
  initData(){
    this.setData({
      records: [],
      personPageNo: 1,
      markPageNo: 1,
      questionPageNo: 1
    })
  },
  search(type){
    // 个人常见问题
    if (type == 'common') {
      this.personQuestionSearch()
    } else if (type == 'mark') {
      this.markQuestionSearch()
    } else {
      this.questionSearch(type)
    }
  },
  personQuestionSearch(personPageNo) {
    if (!personPageNo) {
      personPageNo = this.data.personPageNo;
    }
    let pageSize = this.data.pageSize
    personalQuestionUtil.search(this.data.inputVal, personPageNo, pageSize).then(res => {
      let oldList = this.data.records;
      let newList = oldList.concat(res.records)
      this.setData({
        records: newList,
        personPageNo: personPageNo + 1
      })
      this.setHasData(newList)
    }).catch((err) => {
      console.info('err', err)
      util.showErrorToast('数据查询失败：' + err);
    });
  },
  markQuestionSearch(markPageNo) {
    if (!markPageNo) {
      markPageNo = this.data.markPageNo;
    }
    let pageSize = this.data.pageSize
    markQuestionUtil.search(this.data.inputVal, markPageNo, pageSize).then(res => {
      console.info('res', res)
      let oldList = this.data.records;
      let newList = oldList.concat(res.records)
      this.setData({
        records: newList,
        markPageNo: markPageNo + 1
      })
      this.setHasData(newList)
    }).catch((err) => {
      console.info('err', err)
      util.showErrorToast('数据查询失败：' + err);
    });
  },
  questionSearch(type, questionPageNo) {
    if (!questionPageNo) {
      questionPageNo = this.data.questionPageNo;
    }
    let pageSize = this.data.pageSize;
    questionUtil.searchQuestion(type, this.data.inputVal, questionPageNo, pageSize).then(res => {
      console.info('res', res)
      let oldList = this.data.records;
      let newList = oldList.concat(res.records)
      this.setData({
        records: newList,
        questionPageNo: questionPageNo + 1
      })
      this.setHasData(newList)
    }).catch((err) => {
      console.info('err', err)
      util.showErrorToast('数据查询失败：' + err);
    });
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
  // 查看答案
  getAnswer(e) {
    this.setData({
      istrue: true
    })
    let id = e.currentTarget.dataset.id;
    let answer = e.currentTarget.dataset.answer;
    let question = e.currentTarget.dataset.question;
    let keywords = e.currentTarget.dataset.keywords;
    let curList = [{
      questionId: id,
      question: question,
      type: this.data.type
    }]
    let newList = this.data.questionList;
    let filterList = newList.filter(item => {
      return item.questionId == id
    })
    if (filterList.length <= 0) {
      newList = curList.concat(newList)
    }
    this.setData({
      curAnswer: answer,
      curQuestion: question,
      curKeywords: keywords ? keywords : '',
      questionList: newList
    })
    var that = this;
    WxParse.wxParse('curAnswer', 'html', answer, that, 5);
  },
  // 关闭弹框
  closeDialog: function () {
    this.setData({
      istrue: false
    })
  },
  onLoad() {
    this.personQuestionSearch(1)
  },
  // 完成面试
  finishInterview() {
    this.setData({
      isFinish: true
    })
  },
  // 删除当前问题
  cancelQuestion(e){
    let id = e.currentTarget.dataset.id;
    let newList = this.data.questionList.filter(item => {
      return item.questionId != id
    })
    this.setData({
      questionList: newList
    })
  },
  // 关闭弹窗
  closeFinishDialog(){
    this.setData({
      isFinish: false
    })
  },
  changeCompany(e){
    this.setData({
      company:e.detail.value
    })
  },
  // 完成面试
  okDialog(){
    if (!this.data.company){
      util.showErrorToast("请先填写您面试的公司!");
      return;
    }
    companyUtil.insertConcatQuestion(this.data.questionList,this.data.company).then(res=>{
      console.info('insertConcatQuestion',res)
      if (res.errno == 0){
        wx.showToast({
          title: '标注成功!',
          icon: 'success',
          duration: 3000
        });
        this.setData({
          isFinish: false,
          finishButton:false
        })
        wx.navigateTo({
          url: '/pages/me/editor/editor?category=面试经验'
        });
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.search(this.data.type)
  },
})