import axios from 'axios'


//教训：配置代理不需要了let server_path = 'http://localhost:8080'
//上传图片和登录页获取验证码（reducer，actionCreators）两处改了driftlife_war
//let projectName = '/driftlife_war';
let projectName = '';
export default {
  //获取邮箱注册验证码
  getEmailCode: (data) => axios.get(projectName + '/user/wyemail', data),
  //获取手机注册验证码
  getPhoneCode: (data) => axios.get(projectName + 'user/phoneCode', data),
  //用户注册
  userRegister: (data) => axios.post( projectName + '/user/register', data),
  //获取图形验证码不需要
  //用户登陆
  userLogin: (data) => axios.post(projectName + '/user/login',data),
  //根据用户id获取用户信息
  getUserInfos: (data) => axios.get(projectName + '/user/infos', data),
  //修改用户信息
  updateUserInfo: (data) => axios.post(projectName + '/user/info/update', data),
  //根据id获取用户的分类
  getArticleCategory: (data) => axios.get(projectName + '/home/ArticleCategory', data),
  //根据用户id新增文章
  saveArticle: (data) => axios.post(projectName + '/home/articleInfo/finish', data),
  //根据用户id添加分类
  addNewCategory: (data) => axios.get(projectName + '/home/newArtilceCategory', data),
  //根据条件获取文章列表
  getArticleList: (data) => axios.post(projectName + '/home/articleInfoByCondition', data),
  //文章id获取文章全部信息
  getArticleAllInfo: (data) => axios.get(projectName + '/home/articleAllInfo', data),
  //条件获取文章总数
  getArticleCount: (data) => axios.post(projectName + '/home/ArticleCount', data),
  //新增文章评论
  insertArticleComment: (data) => axios.post(projectName + '/new/articleWord', data),
  //获取文章评论
  getArticleCommentList: (data) => axios.get(projectName + '/articleWord', data),
  //改变文章发布状态
  changeArticleStatus: (data) => axios.get(projectName + '/home/articleStatus', data),
  //获取发现页面文章
  getDiscoverArticleList: (data) => axios.post(projectName + '/home/discover/article',data),
  //用户对文章的态度
  changeUserManner: (data) => axios.get(projectName + '/home/article/userManner',data),
  //用户收藏文章
  collectArticle: (data) => axios.get(projectName + '/home/collect/article', data),
  //获取收藏文章列表
  getCollectArticleList: (data) => axios.get(projectName + '/home/collect/articleList', data),
  //用户取消收藏文章
  deleteCollectArticle: (data) => axios.get(projectName + '/home/cancel/collectArticle', data),
  //用户删除文章
  deleteArticle: (data) => axios.get(projectName + '/home/delete/article', data),
  //用户删除分类
  deleteCategory: (data) => axios.get(projectName + '/home/delete/category', data),
  //用户添加回复
  insertArticleReply: (data) => axios.post(projectName + '/new/articleReply', data),
  //获取回复列表
  getArticleReplyList: (data) => axios.get(projectName + '/articleReply/list', data),
  //该变消息的状态
  changeMessageState: (data) => axios.get(projectName + '/message/state', data),
  //获取会话列表
  getSessionList: (data) => axios.get(projectName + '/sessionInfo', data),
  //新建会话
  insertSession: (data) => axios.get(projectName + '/new/sessionInfo', data),
  //获取聊天消息列表
  getExchangeList: ( data) => axios.get(projectName + '/messageInfo', data),
  //随机取每日一句
  getSentence: () => axios.get(projectName + '/user/randomSentence')
}
