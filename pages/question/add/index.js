const app = getApp()
var questionUtil = require('../../../utils/question.js');

Page({
  data:{
    typeItems: [
      { name: 'js', value: '1', checked: true },
      { name: 'css', value: '2' },
      { name: 'html', value: '3' },
      { name: 'es6', value: '4' },
      { name: 'vue', value: '5' },
      { name: 'nodejs', value: '6' },
    ],
    chooseType:'1'
  },
  typeChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    var typeItems = this.data.typeItems;
    for (var i = 0, len = typeItems.length; i < len; ++i) {
      typeItems[i].checked = typeItems[i].value == e.detail.value;
    }

    this.setData({
      typeItems: typeItems,
      chooseType: e.detail.value
    });
  },
  bindFormSubmit(e){
    let question = e.detail.value.question;
    let answer = e.detail.value.answer;
    let type = this.data.chooseType;
    let keywords = e.detail.value.keywords
    var q = {
      question: question,
      answer: answer,
      type: type,
      keywords: keywords
    }
    questionUtil.addQuestion(q).then(res => {
      wx.showToast({
        title: '添加成功!',
        icon: 'success',
        duration: 3000
      });
      this.onReady()
    }).catch((err) => {
      wx.showToast({
        title: err,
        icon: 'success',
        duration: 3000
      });
    })
  }
})