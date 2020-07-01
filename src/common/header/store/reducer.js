import * as constants from './constants';
import { fromJS } from 'immutable';

//引入immutable库

//换成immutable对象
const defaultState = fromJS({
	focused: false,
	mouseIn: false,
	list: [],
	page: 1,
	totalPage: 1,
	active: 2
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.SEARCH_FOCUS:
			return state.set('focused', true);    //immutable方法 原来直接返回新对象return {focused： true}，现在由immutable处理返回新对象
		case constants.SEARCH_BLUR:
			return state.set('focused', false);
		case constants.CHANGE_LIST:
			return state.merge({
				list: action.data,
				totalPage: action.totalPage
			});
		case constants.MOUSE_ENTER:
			return state.set('mouseIn', true);
		case constants.MOUSE_LEAVE:
			return state.set('mouseIn', false);
		case constants.CHANGE_PAGE:
			return state.set('page', action.page);
		case constants.CHANGE_ACTIVE:
			return state.set('active',action.active);
		default:
			return state;
	}
}
