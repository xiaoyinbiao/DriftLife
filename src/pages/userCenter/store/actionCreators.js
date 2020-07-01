import * as constants from './constants';
import api from '../../../API/url';
import { message } from "antd";

const getUserInfos = (account, password, sex, region, biography) => ({
  type: constants.GET_USER_INFOS,
  account: account,
  password: password,
  sex: sex,
  region: region,
  biography: biography,
})

const updateUserInfos = (info) => ({
  type: constants.UPDATE_USER_INFO,
  email: info.account,
  password: info.password,
  sex: info.sex,
  region: info.address,
  biography: info.description
})
const updateUserInfoInLogin = (name) => ({
  type: constants.UPDATE_INFO_INLOGIN,
  name: name
})
const changeArticleList = (List) => ({
  type: constants.CHANGE_COLLECT_LIST,
  List
})
const deleteCollectInRedux = (data) => ({
  type: constants.DELETE_COLLECT_REDUX,
  data
})

export const getUserInfo = (userId) => {
  return (dispatch) => {
    const params = {
      userId: userId
    }
    api.getUserInfos({params}).then(res => {
      console.log(res)
      const data = res.data
      if (res.data.email) {
        dispatch(getUserInfos(data.email, data.userPassword, data.sex, data.region, data.biography))
      } else {
        dispatch(getUserInfos(data.telephone, data.userPassword, data.sex, data.region, data.biography))
      }
    }).catch(e => {
      console.log(e)
    })
  }
}

export const updateUserInfo = (info, userId) => {
  return (dispatch) => {
    const data = {
      userId: userId,
      name: info.name,
      sex: info.sex,
      headPic: info.userpic,
      email: info.account,
      userPassword: info.password,
      region: info.address,
      biography: info.description
    }
    console.log('data' + data)
    api.updateUserInfo(data).then(res => {
      if (res.data.result) {
        dispatch(updateUserInfos(info))
        dispatch(updateUserInfoInLogin(info.name))
        //window.location.reload();
        message.info("修改成功")
      } else {
        message.error("修改失败")
      }
    }).catch(e => {
      message.error("修改出错" + e)
    })
  }
};

export const getCollectArticleList = (userId) => {
  return (dispatch) => {
    const params = {
      userId: userId
    }
    api.getCollectArticleList({params}).then(res => {
      console.log(res.data)
      dispatch(changeArticleList(res.data))
    }).catch(e => {
      console.log(e)
    })
  }
}
export const handleCancelCollect = (userId,articleId) => {
  return (dispatch) => {
    const params = {
      userId: userId,
      articleId: articleId
    }
    api.deleteCollectArticle({params}).then(res => {
      if (res.data) {
        dispatch(getCollectArticleList(userId))
        message.success('取消收藏成功')
      } else {
        message.info('你已经取消收藏了哦')
      }
    }).catch(e => {
      message.error('取消收藏出错')
    })
  }
}
