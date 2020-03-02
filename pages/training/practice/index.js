const app = getApp();
const trainingUtil = require('../../../utils/training.js');
const util = require('../../../utils/util.js');
var WxParse = require('../../../components/wxParse/wxParse.js');

Page({
  data: {
    optionItems: [],
    pageNo: 1,
    pageSize: 20,
    curIndex: 1,
    questionType: {
      1: "【单选题】",
      2: "【多选题】"
    },
    curType: '',
    questionList: []
  },
  onLoad(option) {
    let category = option.category;
    this.setData({
      category: category
    })
    this.searchTraining(category, 1)
  },
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
            questionList: this.data.questionList.concat(l),
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
    // let list = this.data.optionItems.filter(item => {
    //   return item.id == id
    // })
    // let answer = false;
    // if (list && list.length > 0) {
    //   answer = list[0].isAnswer
    // }
    console.info('answer', answer)
    this.setData({
      hasChoose: answer,
      isAnswer: answer
    })
  },
  // 多选获取值
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
    console.info('vals', vals)
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
  insertMydoQuestion() {
    let doQuestion = {
      question: this.data.curQuestion.question,
      questionId: this.data.curQuestion.id,
      isTrue: this.data.isAnswer,
      category: this.data.curQuestion.category
    }
    trainingUtil.insertDoQuestion(doQuestion).then(res => {
      console.info('insertDoQuestion', res)
    }).catch((err) => {
      console.info('err', err)
    });
  },
  //上一题
  preQuestion() {
    let curIndex = this.data.curIndex;
    if (curIndex <= 1) {
      util.showErrorToast('当前还是第一题哦！')
    } else {
      curIndex = curIndex - 1;
      let curQuestion = this.data.questionList[curIndex - 1]
      console.info('curQuestion', curQuestion)
      this.searchOption(curQuestion.id)
      this.setData({
        curQuestion: curQuestion,
        curType: this.data.questionType[curQuestion.type],
        curIndex: curIndex
      })
      WxParse.wxParse('curAnlysis', 'html', curQuestion.analysis, this, 5);
    }
  },
  // 下一题
  nextQuestion() {
    this.insertMydoQuestion();
    this.closeFinishDialog();
    let curIndex = this.data.curIndex;
    let pageNo = this.data.pageNo;
    let pageSize = this.data.pageSize;
    let curQuestionNum = this.data.questionList.length;
    // 如果当前数量大于当前获取量，则重新获取
    if (curIndex >= curQuestionNum) {
      this.setData({
        pageNo: pageNo + 1,
        curIndex: curIndex + 1
      })
      this.searchTraining(this.data.category)
    } else {
      let curQuestion = this.data.questionList[curIndex]
      this.setData({
        curQuestion: curQuestion,
        curType: this.data.questionType[curQuestion.type],
        curIndex: curIndex + 1
      })
      WxParse.wxParse('curAnlysis', 'html', curQuestion.analysis, this, 5);
      this.searchOption(curQuestion.id)
    }
  },
  goBack(){
    wx.navigateBack({
      delta: 1
    })
  }
})