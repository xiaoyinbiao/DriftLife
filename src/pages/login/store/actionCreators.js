import * as constants from './constants';
import api from '../../../API/url';
import { changeActive } from '../../../common/header/store/actionCreators';
import { message } from "antd";
import { actionCreators as messgeActionCreators} from "../../messagePoint/store";

const changeLogin = () => ({
	type: constants.CHANGE_LOGIN,
	value: true
})

const logout = () => ({
	type: constants.LOGOUT,
	value: false
})

export const changeImgUrl = () => ({
	type: constants.CHANGE_IMG_URL,
	value: '/user/verifycode' + '?r=' + Math.random()
})

//注意
export const setUserLoginInfo = (userId, userName, email) => ({
	type: constants.USER_LOGIN_INFO,
	userId: userId,
	userName: userName,
	email: email
})

export const login = (accout, password, code) => {
	return (dispatch) => {
		console.log(accout,password,code)
		if(accout == undefined || '' || null) {
			return
		}
		if(password == undefined || '' || null) {
			return
		}
		if(code == undefined || '' || null) {
			return
		}
		const userInfo = {
			'account': accout,
			'passWord': password,
			'code': code
		}
		api.userLogin(userInfo).then(res => {
			const data = res.data;
			switch (data.result) {
				case 0:
					message.error('验证码错误');
					break;
				case 1:
					console.log(data);
					dispatch(setUserLoginInfo(data.userId, data.userName, data.email));
					dispatch(changeLogin());      //重点看一下,这是一  //这是二，草，放后面，改变了reducer里的userId后再改变状态跳转，不然跳转后取不到userId
					dispatch(changeActive(1)	);
				  //获取通知消息
				  //dispatch(messgeActionCreators.getWordLists(data.userId));
					break;
				case 2:
					message.error('账号或密码错误');
					break;
				default:
					message.info('登陆出错了，请重试');
			}
		}).catch(e => {
			message.info('登陆失败,请重试')
			console.log(e)
		})
	}
}

export const changeImgCode = () => {
	return (dispatch) => {
		dispatch(changeImgUrl())
	}
};

export const logouting = () => {
	return (dispatch) => {
		dispatch(logout())
		window.location.reload()
	}
}
