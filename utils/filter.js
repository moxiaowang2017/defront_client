
function routeFilter(app,fromPath){
  if (app.globalData.hasLogin){
    wx.navigateTo({
      url: fromPath,
    })
  }else{
    wx.navigateTo({
      url: '/pages/login/index',
    })
  }
}

module.exports = {
  routeFilter
};
