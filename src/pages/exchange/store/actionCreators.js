import api from '../../../API/url';
import * as constants from './constants';
import { message } from "antd";
import {fromJS} from "immutable";

let wsExchange

const addExchangeList = (data) => ({
  type: constants.CHANGE_EXCHANGE_LIST,
  exchangeList: data
})

const changeContentValues = (value) => ({
  type: constants.CHANGE_CONTENT_VALUES,
  contentValue: value
})

const changeSessionList = (data) => ({
  type: constants.CHANGE_SESSION_LIST,
  sessionList: data
})

const addLocalSession = (data)  => ({
  type: constants.ADD_LOACAL_SESSION,
  localSession: data
})

const resetExchangeList = (data) => ({
  type: constants.RESET_EXCHANGE_LIST,
  data
})

export const changeSelectSession = (data) => ({
  type: constants.CHANGE_SELECT_SESSION,
  data
})

export const changeHeaderName = (data) => ({
  type: constants.CHANGE_HEADER_NAME,
  data
})

export const changeFriendId = (friendId) => ({
  type: constants.CHANGE_FRIEND_ID,
  friendId
})

export const openExchangeWs = (userId) => {
  return (dispatch) => {
    if ('WebSocket' in window) {
      wsExchange = new WebSocket(`ws://localhost:8080/exchangeWs?userId=${userId}`)
      wsExchange.onopen = function () {
        //wsExchange.send('分页信息')
      }
      wsExchange.onmessage = function (event) {
        if (event.data == 'noInline') {
          dispatch(addExchangeList({userName: '对方暂时不在线哦'}))
        } else if (event.data == 'handler已连接'){
          //donothing
        } else {
          dispatch(addExchangeList(JSON.parse(event.data)))
        }
      }
      wsExchange.onclose = function () {
        message.info('已关闭对话')
      }
      wsExchange.onerror = function () {
        message.info('会话出现错误')
      }
    } else {
      message.info('你的浏览器暂不支持聊天哦')
    }
  }
}

export const changeContentValue = (value) => {
  return (dispatch) => {
    dispatch(changeContentValues(value))
  }
}

export const sendingContent = (sessionId, messageContent, userId, friendId, userName) => {
  return (dispatch) => {
    const data = {
      sessionId: parseInt(sessionId),
      messageContent: messageContent,
      userId: userId,
      friendId: parseInt(friendId)
    }
    const dataLocation = {
      sessionId: sessionId,
      messageContent: messageContent,
      userId: userId,
      friendId: friendId,
      userName: userName
    }
    wsExchange.send(JSON.stringify(data))
    dispatch(addExchangeList(dataLocation))
  }
}

export const getSessionList = (userId, otherId, otherName) => {
  let existSession
  return (dispatch) => {
    const params = {
      userId: userId
    }
    api.getSessionList({params}).then(res => {
      const data = res.data
      dispatch(changeSessionList(data))
      if (!otherId) {
        message.info('请选择一个会话')
        return
      }
      let isExist = data.some(item => {
        if (item.userId == userId && item.friendId == otherId || item.userId == otherId && item.friendId == userId) {
          existSession = item
          return true
        }
      })
      if (isExist) {
        //改变选择的会话
        dispatch(changeSelectSession(existSession.sessionId))
        //获取消息记录
        dispatch(getExchangeMessage(existSession.sessionId))
      } else {
        const params = {
          userId: userId,
          friendId: parseInt(otherId)
        }
        api.insertSession({params}).then(res => {
          if (res.data != 0) {
            message.success('创建会话成功')
            //添加本地redux会话
            const sessionRedux = {
              sessionId: res.data,
              userId: userId,
              friendName: otherName
            }
            dispatch(addLocalSession(sessionRedux))
            dispatch(changeSelectSession(parseInt(res.data)))
          } else {
            message.info('创建会话失败')
          }
        }).catch(e => {
          message.error('创建会话错误')
        })
      }
    }).catch(e => {
      message.error('获取会话列表失败')
    })
  }
}

//根据sessionId获取消息列表
export const getExchangeMessage = (sessionId) => {
  return (dispatch) => {
    const params = {
      sessionId: sessionId
    }
    api.getExchangeList({params}).then(res => {
      const data = res.data
      dispatch(resetExchangeList(data))
    })
  }
}
