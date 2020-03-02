const util = require('../utils/util.js');
const api = require('../config/api.js');

// 数据统计
function statistics() {
  return new Promise(function (resolve, reject) {
    util.request(api.Statistics, {}, 'POST').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

// 根据问题分类查询练习题
function searchTraining(category, pageNo, pageSize) {
  return new Promise(function (resolve, reject) {
    util.request(api.SearchTraining, {
      category: category,
      pageNo:pageNo,
      pageSize:pageSize
    }, 'POST').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

// 根据问题Id查询问题选项
function searchOption(questionId) {
  return new Promise(function (resolve, reject) {
    util.request(api.SearchOption + `/${questionId}`, {}, 'GET').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

// 添加我的练习库
function insertDoQuestion(doQuestion) {
  return new Promise(function (resolve, reject) {
    util.request(api.InsertDoQuestion, doQuestion, 'POST').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

function queryDoQuestion(type,pageNo,pageSize) {
  return new Promise(function (resolve, reject) {
    util.request(api.QueryDoQuestion + `/${type}`, {
      pageNo: pageNo,
      pageSize: pageSize
    }, 'POST').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

module.exports = {
  statistics,
  searchTraining,
  searchOption,
  insertDoQuestion,
  queryDoQuestion
};