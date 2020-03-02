const util = require('../utils/util.js');
const api = require('../config/api.js');

function insert(publish) {
  return new Promise(function (resolve, reject) {
    util.request(api.InsertPublish, publish, 'POST').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

function search(pageNo,pageSize) {
  return new Promise(function (resolve, reject) {
    util.request(api.SearchPublish, {
      pageNo: pageNo,
      pageSize: pageSize
    }, 'POST').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

function searchByUserId(pageNo, pageSize) {
  return new Promise(function (resolve, reject) {
    util.request(api.SearchByUserId, {
      pageNo: pageNo,
      pageSize: pageSize
    }, 'POST').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

function getMyCount() {
  return new Promise(function (resolve, reject) {
    util.request(api.GetMyCount, {}, 'GET').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

function searchArticle(pageNo,pageSize) {
  return new Promise(function (resolve, reject) {
    util.request(api.SearchArticle, {
      pageNo:pageNo,
      pageSize: pageSize
    }, 'POST').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

function insertArticle(obj) {
  return new Promise(function (resolve, reject) {
    util.request(api.InsertArticle, obj, 'POST').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

function searchArticleDetail(detailId) {
  return new Promise(function (resolve, reject) {
    util.request(api.SearchArticleDetail + `/${detailId}`,{}, 'GET').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

function insertAdvice(advice) {
  return new Promise(function (resolve, reject) {
    util.request(api.InsertAdvice, advice, 'POST').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

//点赞
function insertClicks(concatId) {
  return new Promise(function (resolve, reject) {
    util.request(api.InsertClicks + `/${concatId}`, {}, 'GET').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}


module.exports = {
  insert,
  search,
  searchByUserId,
  getMyCount,
  searchArticle,
  insertArticle,
  insertAdvice,
  searchArticleDetail,
  insertClicks
};