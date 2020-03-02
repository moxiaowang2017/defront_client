const util = require('../utils/util.js');
const api = require('../config/api.js');

function search(name, pageNo, pageSize) {
  return new Promise(function (resolve, reject) {
    //登录远程服务器
    util.request(api.SearchMarkQuestion, {
      question: name,
      pageNo: pageNo,
      pageSize: pageSize
    }, 'POST').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

function insertByQuestionId(questionId) {
  return new Promise(function (resolve, reject) {
    //登录远程服务器
    util.request(api.InsertByQuestionId + `/${questionId}`, {}, 'GET').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

function deleteByQuestionId(questionId) {
  return new Promise(function (resolve, reject) {
    util.request(api.DeleteByQuestionId + `/${questionId}`, {}, 'GET').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

function getMarkQuestionCount() {
  return new Promise(function (resolve, reject) {
    util.request(api.GetMarkQuestionCount, {}, 'GET').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}


module.exports = {
  search,
  insertByQuestionId,
  deleteByQuestionId,
  getMarkQuestionCount
};