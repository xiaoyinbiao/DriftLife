import axios from 'axios';
import * as constants from './constants'
import api from '../../../API/url';
import { message } from "antd";

const changeCode = (data) => ({
  type: constants.CHANGE_CODE,
  code: data
})

const changeCodeState = () => ({
  type: constants.CHANGE_CODE_STATE
})

const changeWaitState = (state) => ({
  type: constants.CHANGE_WAIT_STATE,
  state
})

const changeWaitTime = (time) => ({
  type: constants.CHANGE_WIAT_TIME,
  time
})

//获取注册验证码
export const handleGetCode = (account) => {
  return (dispatch) => {
    if(account == null || account == '' || account.trim() == '') {
      message.info('请先填写账号')
      return
    }
    dispatch(changeCodeState())
    dispatch(changeCodeState(true))
    const reg =  /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (reg.test(account)) {
      let params = {
        email: account
      };
      api.getEmailCode({params}).then(res => {
        dispatch(changeCode(res.data.code));
        handleWaitTime(dispatch);
      }).catch(e => {
        console.log(e);
      });
    } else {
      let params = {
        phone: account
      }
      api.getPhoneCode({params}).then(res => {
        dispatch(changeCode(res.data.code))
        handleWaitTime(dispatch);
      }).catch(e => {
        message.info('获取手机验证码失败，请重试！' + e)
      })
    }
  }
}

//处理注册
export const handleOnFinish = (value, code) => {
  return () => {
    const data = {
      account: value.account,
      passWord: value.password,
      region: null
    }
    if(code && value.code == code) {
      api.userRegister(data).then(res => {
        if(res.data.result) {
          alert('注册成功')
        } else {
          alert('注册失败,请不要重复注册')
        }
      }).catch(e => {
        alert('注册失败' + e)
      })
    } else {
      alert('验证码错误')
    }
  }
}

//倒计时
const handleWaitTime = (dispatch) => {
  let time = 60;
  let handle = setInterval(() => {
    dispatch(changeWaitState(true));
    dispatch(changeWaitTime(time));
    time--;
    if (time < 0) {
      clearInterval(handle);
      dispatch(changeWaitState(false))
    }
  }, 1000)
};

