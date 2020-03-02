const util = require('../utils/util.js');
const api = require('../config/api.js');

function search(name, pageNo, pageSize) {
  return new Promise(function (resolve, reject) {
    //登录远程服务器
    util.request(api.SearchPersonalQuestion, {
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

function insert(quuestion) {
  return new Promise(function (resolve, reject) {
    //登录远程服务器
    util.request(api.InsertPersonalQuestion, quuestion, 'POST').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

module.exports = {
  search,
  insert
};