//index.js
//获取应用实例
const app = getApp()
const questionUtil = require('../../../utils/question.js');
const util = require('../../../utils/util.js');

Page({
  data: {
    company: '',
    pageNo: 1,
    pageSize: 5,
    commonQuestions:[],
    pages:0
  },
  addQuestion() {
    wx.navigateTo({
      url: '/pages/question/add/index',
    })
  },
  // 获取填写的公司
  getCompany(e) {
    this.setData({
      company: e.detail.value
    })
  },
  gotoCompany() {
    let company = this.data.company
    if (company) {
      wx.navigateTo({
        url: '/pages/ready/company/index?company=' + company,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请输入将要面试的公司',
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {

        }
      });
    }
  },
  getCommonQuestions(pageNo) {
    if(!pageNo){
      pageNo = this.data.pageNo;
    }
    let pageSize = this.data.pageSize;
    questionUtil.searchCommonQuestion(pageNo, pageSize).then(res => {
      console.info('res',res);
      if(res.errno == 0){
        this.setData({
          commonQuestions: res.data.records,
          pages:res.data.pages,
          pageNo:pageNo
        })
      }
    }).catch((err) => {
      console.info('err', err)
      util.showErrorToast('数据查询失败：' + err);
    });
  },
  gotoPage(e){
    let curPageNo = e.currentTarget.dataset.index
    this.getCommonQuestions(curPageNo)
  },
  // 添加到个人常见问题
  addToPersonal(e){
    let questionId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/ready/personal/index?questionId=' + questionId,
    })
  },
  onLoad() {
    this.getCommonQuestions()
  }
})