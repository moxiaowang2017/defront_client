const app = getApp()
var companyUtil = require('../../../utils/company.js');
var util = require('../../../utils/util.js');

Page({
  data: {
    hasData: false,
    company: '',
    companyId: '',
    discussList: [],
    companyLikeList:[],//猜你喜欢，公司列表
    hasMore: false,
    pageNo: 1,   //公司评论初始页
    pageSize: 2,  //公司评论分页
    istrue:false
  },
  //获取评价内容
  getTxt(e) {
    this.setData({
      discuss: e.detail.value
    })
  },
  // 添加评价
  addDiscuss() {
    console.info('istrue', this.data.istrue)
    this.setData({
      istrue: true
    })
    console.info('istrue', this.data.istrue)
  },
  // 关闭弹框
  closeDialog: function () {
    this.setData({
      istrue: false
    })
  },
  // 我要评价
  okDialog: function () {
    let discussObj = {
      companyId: this.data.companyId,
      discuss: this.data.discuss
    }
    console.info('discussObj', discussObj)
    companyUtil.addCompanyDiscuss(discussObj, this.data.company, this.data.recordId).then(res => {
      console.info('res', res)
      if (res.errno == 0) {
        this.setData({
          istrue: false
        })
        let newList = [{
          nickName: res.data.discuss.nickName,
          avatar: res.data.discuss.avatar,
          discussTime: util.toDate(res.data.discuss.discussTime),
          discuss: res.data.discuss.discuss,
        }].concat(this.data.discussList)
        this.setData({
          discussList: newList
        })
        if (!this.data.companyId) {
          this.setData({
            companyId: res.data.companyId
          })
        }
        util.showErrorToast('评价成功');
        wx:wx.navigateBack({
          delta: 1,
        })
      }
    }).catch((err) => {
      console.info('err', err)
      util.showErrorToast('数据查询失败：' + err);
    });
  },
  // 关联问题跳转
  gotoQuestion(e) {
    let companyId = this.data.companyId;
    let company = this.data.company;
    wx.navigateTo({
      url: '/pages/ready/contact/index?companyId=' + companyId + '&company=' + company,
    })
  },
  // 获取公司评价
  getDiscussList(companyId) {
    let pageNo = this.data.pageNo
    let pageSize = this.data.pageSize;
    console.info('pageNo', pageNo)
    companyUtil.getCompanyDiscuss(companyId, pageNo, pageSize).then(res => {
      console.info('getCompanyDiscuss', res);
      if (res.pages > pageNo) {
        this.setData({
          hasMore: true
        })
      } else {
        this.setData({
          hasMore: false
        })
      }
      if (res.records && res.records.length <= 0) {
        this.setData({
          hasData: false
        })
      } else {
        this.setData({
          hasData: true,
          discussList: this.dealDiscuss(this.data.discussList, res.records)
        })
      }
      this.setData({
        pageNo: pageNo + 1
      })
    }).catch((err) => {
      console.info('err', err)
      util.showErrorToast('数据查询失败：' + err);
    });
  },
  // 处理评价
  dealDiscuss(oldList, discussList) {
    let newList = oldList;
    for (let i = 0; i < discussList.length; i++) {
      let newObj = {
        id: discussList[i].id,
        companyId: discussList[i].companyId,
        nickName: discussList[i].nickName,
        avatar: discussList[i].avatar,
        discuss: discussList[i].discuss,
        userId: discussList[i].userId,
        discussTime: util.toDate(discussList[i].discussTime)
      }
      newList.push(newObj)
    }
    return newList;
  },
  // 获取更多公司评价
  getMoreDiscuss() {
    this.getDiscussList(this.data.companyId)
  },
  // 公司精确查询
  companySearch(){
    let company = this.data.company;
    companyUtil.search(company, 1, 10).then(res => {
      if (res.records && res.records.length <= 0) {
        this.setData({
          hasData: false
        })
      } else {
        this.setData({
          companyId: res.records[0].id
        })
        this.getDiscussList(res.records[0].id)
      }
    }).catch((err) => {
      console.info('err', err)
      util.showErrorToast('数据查询失败：' + err);
    });
  },
  // 公司模糊查询
  companySearchLike(){
    let company = this.data.company;
    companyUtil.searchLike(company, 1, 2).then(res => {
      if (res.records && res.records.length <= 0) {
        this.setData({
          hasLikeData: false
        })
      } else {
        this.setData({
          companyLikeList: res.records
        })
      }
    }).catch((err) => {
      console.info('err', err)
      util.showErrorToast('数据查询失败：' + err);
    });
  },
  // 跳转到该公司
  gotoCompany(e){
    let name = e.currentTarget.dataset.name;
    wx.redirectTo({
      url: '/pages/ready/company/index?company=' + name,
    })
  },
  onLoad(params) {
    let company = params.company;
    let recordId = params.recordId;
    console.info('recordId', recordId)
    this.setData({
      company: company,
      recordId: recordId
    })
    this.companySearch();
    this.companySearchLike();
  }
})