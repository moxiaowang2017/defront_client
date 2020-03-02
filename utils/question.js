const util = require('../utils/util.js');
const api = require('../config/api.js');

function searchQuestion(type, name, pageNo, pageSize) {
  return new Promise(function (resolve, reject) {
    //登录远程服务器
    util.request(api.SearchQuestion + `/${type}`, {
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

function addQuestion(question){
  return new Promise(function (resolve, reject) {
    //登录远程服务器
    util.request(api.AddQuestion, question, 'POST').then(res => {
      if (res.errno === 0) {
        resolve(res);
      } else {
        reject(res);
      }
    }).catch((err) => {
      reject(err);
    });
  }).catch((err) => {
    reject(err);
  })
}

// 分页查询常见问题
function searchCommonQuestion(pageNo,pageSize){
  return new Promise(function (resolve, reject) {
    //登录远程服务器
    util.request(api.SearchCommonQuestion, {
      pageNo: pageNo,
      pageSize: pageSize
    }, 'POST').then(res => {
      if (res.errno === 0) {
        resolve(res);
      } else {
        reject(res);
      }
    }).catch((err) => {
      reject(err);
    });
  })
}

// 根据Id获取常见问题
function getOneCommonQuestion(id) {
  return new Promise(function (resolve, reject) {
    util.request(api.GetOneCommonQuestion + `/${id}`, 'GET').then(res => {
      if (res.errno === 0) {
        resolve(res);
      } else {
        reject(res);
      }
    }).catch((err) => {
      reject(err);
    });
  })
}

// 根据Id获取常见问题
function getOnePersonalQuestion(questionId) {
  return new Promise(function (resolve, reject) {
    util.request(api.GetOnePersonalQuestion + `/${questionId}`, 'GET').then(res => {
      if (res.errno === 0) {
        resolve(res);
      } else {
        reject(res);
      }
    }).catch((err) => {
      reject(err);
    });
  })
}

function searchNoMark(type, name, pageNo, pageSize) {
  return new Promise(function (resolve, reject) {
    //登录远程服务器
    util.request(api.SearchNoMark + `/${type}`, {
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

function getDoQuestionChart() {
  return new Promise(function (resolve, reject) {
    util.request(api.GetDoQuestionChart, {}, 'POST').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}


module.exports = {
  searchQuestion,
  addQuestion,
  searchCommonQuestion,
  getOneCommonQuestion,
  getOnePersonalQuestion,
  searchNoMark,
  getDoQuestionChart
};