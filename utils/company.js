const util = require('../utils/util.js');
const api = require('../config/api.js');

function search(name, pageNo, pageSize) {
  return new Promise(function (resolve, reject) {
    util.request(api.SearchCompany, {
      company: name,
      pageNo: pageNo,
      pageSize: pageSize
    }, 'POST').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

function searchLike(name, pageNo, pageSize) {
  return new Promise(function (resolve, reject) {
    util.request(api.SearchLikeCompany, {
      company: name,
      pageNo: pageNo,
      pageSize: pageSize
    }, 'POST').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

function getCompanyDiscuss(companyId, pageNo, pageSize){
  return new Promise(function (resolve, reject) {
    util.request(api.GetCompanyDiscuss + `/${companyId}`, {
      pageNo: pageNo,
      pageSize: pageSize
    }, 'POST').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}

function addCompanyDiscuss(companyDiscuss,company,recordId) {
  return new Promise(function (resolve, reject) {
    util.request(api.AddCompanyDiscuss, {
      recordId: recordId,
      company: company,
      defrontCompanyDiscuss: companyDiscuss
    }, 'POST').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}

function searchConcatQuestion(companyId, isMark,pageNo,pageSize) {
  return new Promise(function (resolve, reject) {
    util.request(api.SearchConcatQuestion + `/${companyId}`, {
      isMark: isMark,
      companyId: companyId,
      pageNo: pageNo,
      pageSize: pageSize
    }, 'POST').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}

function insertConcatQuestion(questionList,company) {
  return new Promise(function (resolve, reject) {
    util.request(api.InsertConcatQuestion, {
      defrontQuestionCompanys: questionList,
      company: company,
    }, 'POST').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}

function getInterviewRecords(pageNo, pageSize) {
  return new Promise(function (resolve, reject) {
    util.request(api.GetInterviewRecords, {
      pageNo: pageNo,
      pageSize: pageSize,
    }, 'POST').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}

function getUnreviewCount() {
  return new Promise(function (resolve, reject) {
    util.request(api.GetUnreviewCount, {}, 'GET').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  });
}



module.exports = {
  search,
  searchLike,
  getCompanyDiscuss,
  addCompanyDiscuss,
  searchConcatQuestion,
  insertConcatQuestion,
  getInterviewRecords,
  getUnreviewCount
};