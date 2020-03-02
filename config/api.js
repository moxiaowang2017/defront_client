// var WxApiRoot = 'http://139.129.116.136:8080/wx/';
// var WxApiRoot = 'https://localhost:8080/wx/';
var WxApiRoot = 'https://jours.cc:8080/wx/';


module.exports = {
  AuthLoginByWeixin: WxApiRoot + 'auth/login_by_weixin', //微信登录
  AddQuestion: WxApiRoot + 'question/insert', // 添加问题
  SearchQuestion: WxApiRoot + 'question/search', // 查询问题
  SearchNoMark: WxApiRoot + 'question/searchNoMark',//查询问题（未标注）
  SearchPersonalQuestion: WxApiRoot + 'personalQuestion/search',//查询个人常见问题
  SearchMarkQuestion: WxApiRoot + 'markQuestion/search',//查询个人标注问题
  SearchCompany: WxApiRoot + 'company/search',//精准查询相关公司
  SearchLikeCompany: WxApiRoot + 'company/searchLike',//模糊查询相关公司
  GetCompanyDiscuss: WxApiRoot + 'company/searchDiscuss',//根据companyId查询公司评价
  AddCompanyDiscuss: WxApiRoot + 'company/insertDiscuss',//新增公司评价
  SearchCommonQuestion: WxApiRoot + 'commonQuestion/search',//常见问题查询
  GetOneCommonQuestion: WxApiRoot + 'commonQuestion/getOne', // 根据Id获取常见问题
  InsertPersonalQuestion: WxApiRoot + 'personalQuestion/insert',//添加个人常见问题
  SearchConcatQuestion: WxApiRoot + 'company/searchConcatQuestion',//根据companyId获取关联问题
  InsertConcatQuestion: WxApiRoot + 'company/insertConcatQuestion',// 批量添加关联问题
  Statistics: WxApiRoot + 'training/statistics',//练习统计
  SearchTraining: WxApiRoot + 'training/searchTraining',//根据问题分类获取练习题
  SearchOption: WxApiRoot + 'training/searchOption',//根据问题ID查询选项
  InsertDoQuestion: WxApiRoot + 'training/insertDoQuestion',//添加自己的练习库
  InsertByQuestionId: WxApiRoot + 'markQuestion/insertByQuestionId',//根据questionID添加标注问题
  DeleteByQuestionId: WxApiRoot + 'markQuestion/delete',//根据questionId删除标注问题
  GetOnePersonalQuestion: WxApiRoot + 'personalQuestion/searchByQuestionId',//根据问题ID获取个人常见问题
  QueryDoQuestion: WxApiRoot + 'training/queryDoQuestion',// 查询个人练习题（全部/错题）
  InsertPublish: WxApiRoot + 'publish/insert',// 添加发布内容
  SearchPublish: WxApiRoot + 'publish/search',//查询发布内容
  SearchByUserId: WxApiRoot + 'publish/searchByUserId',//根据用户查看发布内容
  IsClock: WxApiRoot + 'publish/isClock',// 是否已经打卡
  SearchArticle: WxApiRoot + 'publish/searchArticle',// 查询文章
  InsertAdvice: WxApiRoot + 'publish/insertAdvice',// 添加建议
  InsertArticle: WxApiRoot + 'publish/insertArticleDetail',//添加文章
  SearchArticleDetail: WxApiRoot + 'publish/searchArticleDetail',//查询文章详情
  GetMarkQuestionCount: WxApiRoot + 'markQuestion/getMarkQuestionCount',// 获取当前用户的标注数
  GetInterviewRecords: WxApiRoot + 'company/getInterviewRecords',// 获取面试记录
  GetUnreviewCount: WxApiRoot + 'company/getUnreviewCount', //获取未评价的面试记录数量
  GetDoQuestionChart: WxApiRoot + 'question/getDoQuestionChart',// 获取个人练习库统计
  GetMyCount: WxApiRoot + 'publish/getMyCount',// 获取我的页面的数据统计
  InsertClicks: WxApiRoot + 'publish/insertClicks',// 点赞
}