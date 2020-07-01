import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	login: false,
	imgUrl: '/user/verifycode',
	userId: 0,
	userName: '',
	email: ''
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_LOGIN:
			return state.set('login', action.value);
		case constants.LOGOUT:
			return state.set('login', action.value);
		case constants.CHANGE_IMG_URL:
			return state.set('imgUrl',action.value);
		case constants.USER_LOGIN_INFO:
			return state.merge({
				userId: fromJS(action.userId),
				userName: fromJS(action.userName),
				email: fromJS(action.email)
			});
		case 	'userCenter/UPDATE_INFO_INLOGIN':
			return state.set('userName',action.name)
		default:
			return state;
	}
}
