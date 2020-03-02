var api = require('../config/api.js');
var app = getApp();
let monthDay = function (year) {
  let month2Day = 28;
  if (year % 4 == 0) {
    month2Day = 29;
  }
  return {
    1: 31,
    2: month2Day,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
  }
}

function formatTime(date) {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n
}
// 截取时间
function toDate(timeStamp) {
  if (timeStamp) {
    return timeStamp.substring(0, 10)
  }
  return ''
}

/**
 * 封装微信的的request
 */
function request(url, data = {}, method = "GET") {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-Defront-Token': wx.getStorageSync('token')
      },
      success: function (res) {

        if (res.statusCode == 200) {

          if (res.data.errno == 501) {
            // 清除登录相关内容
            try {
              wx.removeStorageSync('userInfo');
              wx.removeStorageSync('token');
            } catch (e) {
              // Do something when catch error
            }
            // 切换到登录页面
            wx.navigateTo({
              url: '/pages/login/index'
            });
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function (err) {
        reject(err)
      }
    })
  });
}

function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/images/icon-error.png'
  })
}

function showSuccessToast(msg) {
  wx.showToast({
    title: msg,
    image: '/images/icon-success.png'
  })
}

function getCurDate() {
  var now = new Date();
  var year = now.getFullYear(); //得到年份
  var month = now.getMonth(); //得到月份
  var date = now.getDate(); //得到日期
  var day = now.getDay(); //得到周几
  let monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
  let monthStr = monthArr[month];
  let weekArr = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  let weekStr = weekArr[day];
  return {
    monthStr: monthStr,
    weekStr: weekStr,
    date: date
  }
}

/**
 * 获取最近几天的日期数组
 * num 几天 如：7为七天
 */
function getDateStr(num) {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let arr = []
  if (day > num) {
    if ((month + '').length < 2) {
      month = '0' + month;
    }
    let yearMonth = year + '-' + month
    for (let i = (num - 1); i >= 0; i--) {
      let dayStr = (day - i) + ''
      if (dayStr.length < 2) {
        dayStr = '0' + dayStr;
      }
      arr.push(yearMonth + '-' + dayStr)
    }
  } else {
    let lastMonth = 0;
    if (month == 1) {
      lastMonth = 12
    } else {
      lastMonth = month - 1;

    }
    let curMonthDay = monthDay(year)[lastMonth];
    if ((lastMonth + '').length < 2) {
      lastMonth = '0' + lastMonth;
    }
    let yearLastMonth = year + '-' + lastMonth
    for (let i = curMonthDay - (num - day); i <= curMonthDay; i++) {
      let curDay = i + ''
      if (curDay.length < 2) {
        curDay = '0' + curDay
      }
      arr.push(yearLastMonth + '-' + curDay)
    }
    if ((month + '').length < 2) {
      month = '0' + month;
    }
    let yearMonth = year + '-' + month
    for (let i = 1; i <= day; i++) {
      let curDay = i + ''
      if (curDay.length < 2) {
        curDay = '0' + curDay
      }
      arr.push(yearMonth + '-' + curDay)
    }
  }
  return arr;
}

module.exports = {
  formatTime,
  toDate,
  request,
  redirect,
  showErrorToast,
  showSuccessToast,
  getCurDate,
  getDateStr
};