const app = getApp();
const trainingUtil = require('../../../utils/training.js');
const util = require('../../../utils/util.js');
var WxParse = require('../../../components/wxParse/wxParse.js');

Page({
  data: {
    optionItems: [],
    pageNo: 1,
    pageSize: 1,
    curIndex: 1,
    questionType: {
      1: "【单选题】",
      2: "【多选题】"
    },
    curType: '',
    questionList: []
  },
  onLoad(option) {
    this.initData(option)
  },
  // 初始化数据
  initData(option){
    let curId = option.curId;
    // 上一题跳转
    if (curId){
      let category = option.category;
      let curIndex = option.curIndex;
      if (!curIndex) {
        curIndex = 1
      }
      this.setData({
        category: category,
        curIndex: curIndex
      })
      this.searchTrainingById(curId);
    }else{
      let category = option.category;
      let curIndex = option.curIndex;
      let lastQuestionId = option.lastQuestionId;
      if (!curIndex) {
        curIndex = 1
      }
      this.setData({
        category: category,
        curIndex: curIndex,
        lastQuestionId: lastQuestionId ? lastQuestionId : null
      })
      this.searchTraining(category, 1)
    }
    
  },
  searchTrainingById(id){
    trainingUtil.searchTrainingById(id).then(res=>{
      console.info('searchTrainingById', res);
      if (res.errno == 0){
        this.setData({
          curQuestion: res.data,
          curType: this.data.questionType[res.data.type]
        })
        WxParse.wxParse('curAnlysis', 'html', res.data.analysis, this, 5);
        this.searchOption(id)
      }
    })
  },
  // 查询面试题
  searchTraining(category, pageNo) {
    if (!pageNo) {
      pageNo = this.data.pageNo;
    }
    let pageSize = this.data.pageSize;
    trainingUtil.searchTraining(category, pageNo, pageSize).then(res => {
      console.info('res', res)
      if (res.errno == 0) {
        let l = res.data.records

        if (l && l.length > 0) {
          this.setData({
            curQuestion: l[0],
            curType: this.data.questionType[l[0].type]
          })
          WxParse.wxParse('curAnlysis', 'html', l[0].analysis, this, 5);
          this.searchOption(l[0].id)
        } else {
          this.setData({
            hasNoData: true
          })
        }
      } else {
        util.showErrorToast('数据查询失败' + res.errmsg);
      }
    }).catch((err) => {
      console.info('err', err)
      util.showErrorToast('数据查询失败：' + err);
    });
  },
  searchOption(questionId) {
    trainingUtil.searchOption(questionId).then(res => {
      console.info('searchOption', res);
      if (res.errno == 0) {
        this.setData({
          optionItems: res.data
        })
      } else {
        util.showErrorToast('数据查询失败' + res.errmsg);
      }
    }).catch((err) => {
      console.info('err', err)
      util.showErrorToast('数据查询失败：' + err);
    });
  },
  // 单选获取值
  radioChange(e) {
    let answer = e.detail.value
    this.setData({
      hasChoose: answer,
      isAnswer: answer
    })
  },
  // 多选获取值并判断是否为正确答案
  checkboxChange(e) {
    let vals = e.detail.value
    let chooseLength = vals.length;
    let trueList = this.data.optionItems.filter(item => {
      return item.isAnswer == 1
    })
    let trueLength = 0;
    if (trueList) {
      trueLength = trueList.length
    }
    let isAnswer = 'false'
    if (vals.indexOf("false") < 0) {
      if (trueLength == chooseLength) {
        isAnswer = 'true';
      }
    }
    this.setData({
      isAnswer: isAnswer,
      hasChoose: chooseLength > 0
    })
  },

  // 完成 弹框显示答案和对错 toDo
  finished() {
    if (!this.data.hasChoose) {
      util.showErrorToast('请选择选项！')
    } else {
      this.setData({
        isFinish: true
      })
    }
  },
  closeFinishDialog() {
    this.setData({
      isFinish: false
    })
  },
  // 添加到自己的做题库
  insertMydoQuestion(successBack) {
    let doQuestion = {
      question: this.data.curQuestion.question,
      questionId: this.data.curQuestion.id,
      isTrue: this.data.isAnswer,
      category: this.data.curQuestion.category
    }
    trainingUtil.insertDoQuestion(doQuestion).then(res => {
      console.info('insertDoQuestion', res)
      successBack()
    }).catch((err) => {
      console.info('err', err)
    });
  },
  //上一题
  preQuestion() {
    let lastQuestionId = this.data.lastQuestionId;
    if (lastQuestionId){
      let curIndex = parseInt(this.data.curIndex);
      let category = this.data.category;
      console.info('category', category)
      wx.redirectTo({
        url: '/pages/training/practice/index?curId=' + lastQuestionId + '&category=' + category + '&curIndex=' + (curIndex - 1),
      })
    }else{
      util.showErrorToast('当前还是第一题哦');
    }
  },
  // 下一题
  nextQuestion() {
    let lastQuestionId = this.data.curQuestion.id;
    let curIndex = parseInt(this.data.curIndex);
    let category = this.data.category;
    console.info('category', category)
    this.insertMydoQuestion(function(){
      wx.redirectTo({
        url: '/pages/training/practice/index?category=' + category + '&curIndex=' + (curIndex + 1) + '&lastQuestionId=' + lastQuestionId,
      })
    })
  },
  goBack(){
    wx.navigateBack({
      delta: 1
    })
  }
})