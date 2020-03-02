const app = getApp()
const trainingUtil = require('../../../utils/training.js');
const util = require('../../../utils/util.js');
const param = require('../../../config/param.js');
Page({
  data: {
    items: [{
      name: 'JS',
      total: 0,
      done: 0,
      acc: 0,
      category: 1
    }, {
      name: 'CSS',
      total: 0,
      done: 0,
      acc: 0,
      category: 2
    }, {
      name: 'HTML',
      total: 0,
      done: 0,
      acc: 0,
      category: 3
    }, {
      name: 'ES6',
      total: 0,
      done: 0,
      acc: 0,
      category: 4
    }, {
      name: 'VUE',
      total: 0,
      done: 0,
      acc: 0,
      category: 5
    }, {
      name: 'NODEJS',
      total: 0,
      done: 0,
      acc: 0,
      category: 6
    }]
  },
  gotoPractice(e) {
    let category = e.currentTarget.dataset.category;
    wx.navigateTo({
      url: '/pages/training/practice/index?category=' + category,
    })
  },
  onLoad() {
    trainingUtil.statistics().then(res => {
      console.info('statistics', res)
      if (res.errno == 0) {
        this.setData({
          continueDay: res.data.continueDay,
          totalNum: res.data.totalNum
        })
        this.statistis(res.data.categoryNum, res.data.trainingCategory, res.data.categoryAcc)
      } else {
        util.showErrorToast('数据查询失败' + res.errmsg);
      }
    }).catch((err) => {
      console.info('err', err)
      util.showErrorToast('数据查询失败：' + err);
    });
  },
  listToMap(list) {
    if (list instanceof Array) {
      let obj = {}
      for (let i = 0; i < list.length; i++) {
        let key = list[i].category;
        let val = list[i].num
        obj[key] = val;
      }
      return obj;
    }
    return {}
  },

  statistis(categoryNum, trainingCategory, categoryAcc) {
    let categoryMap = this.listToMap(categoryNum);
    let trainingCategoryMap = this.listToMap(trainingCategory);
    let categoryAccMap = this.listToMap(categoryAcc);
    let newItem = this.data.items.map(item => {
      let total = categoryMap[item.category];
      let trueNum = categoryAccMap[item.category];
      let acc = 0;
      if (total && total > 0 && trueNum && trueNum > 0) {
        acc = (parseFloat(trueNum / total) * 100).toFixed(0);
      }
      return {
        name: item.name,
        total: trainingCategoryMap[item.category] ? trainingCategoryMap[item.category] : 0,
        done: categoryMap[item.category] ? categoryMap[item.category] : 0,
        acc: acc,
        category: item.category
      }
    })
    this.setData({
      items: newItem
    })
  }
})