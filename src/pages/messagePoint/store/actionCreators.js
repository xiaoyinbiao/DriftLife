import { constants } from '../store';
import { message } from "antd";
import api from '../../../API/url';

const changeWordLists = (data) => ({
  type: constants.CHANGE_WORD_LISTS,
  wordList: data
})

const changeReplLists = (data) => ({
  type: constants.CHANGE_REPLY_LISTS,
  replyList: data
})

const changeCount = (data) => ({
  type: constants.CHANGE_COUNT,
  count: data
})

let ws
export const getWordLists = (userId) => {
  return (dispatch) => {
    if ('WebSocket' in window) {
      ws = new WebSocket(`ws://localhost:8080/ws?userId=${userId}`)
      ws.onopen = function () {
        ws.send('分页信息')
      }
      ws.onmessage = function (event) {
        let count = 0
        let res = event.data.split('@')
        let word = JSON.parse(res[0])
        let reply = JSON.parse(res[1])
        word.forEach(item => {
          if (item.checkState === 0) {
            count++
          }
        })
        reply.forEach(item => {
          if (item.checkState === 0) {
            count++
          }
        })
        dispatch(changeWordLists(word))
        dispatch(changeReplLists(reply))
        dispatch(changeCount(count))
      }
      ws.onerror = function (event) {
        message.error('获取通知失败' + event.data)
      }
    }
  }
}

export const closeWebSocket = (login) => {
  return  (dispatch) => {
    if (ws && !login) {
      ws.close()
      console.log('关闭了连接')
    }
  }
}

export const changeMessageState = (articleWordId, replyId) => {
  return (dispatch) => {
    const params = {
      articleWordId: articleWordId,
      replyId: replyId
    }
    api.changeMessageState({params}).then(res => {
      if (res.data) {
        console.log('已读成功')
        dispatch(changeCount(0))
      }
    }).catch(e => {
      console.log('已读失败' + e)
    })
  }
}
