import * as constants from './constants';
import { fromJS } from 'immutable';
import axios from 'axios';
import * as discoverAction  from '../../../pages/discover/store/actionCreators'

const changeList = (data) => ({
	type: constants.CHANGE_LIST,
	data: fromJS(data),
	totalPage: Math.ceil(data.length / 10)
});

export const searchFocus = () => ({
	type: constants.SEARCH_FOCUS
});

export const searchBlur = () => ({
	type: constants.SEARCH_BLUR
});

export const mouseEnter = () => ({
	type: constants.MOUSE_ENTER
});

export const mouseLeave = () => ({
	type: constants.MOUSE_LEAVE
});

export const changePage = (page) => ({
	type: constants.CHANGE_PAGE,
	page
});

export const changeActive = (active) => ({
	type: constants.CHANGE_ACTIVE,
	active
})

export const getList = () => {
	return (dispatch) => {
		axios.get('/api/headerList.json').then((res) => {
			const data = res.data;
			dispatch(changeList(data.data));
		}).catch(() => {
			console.log('error');
		})
	}
};

export const handleDiscoverClick = () => {
	return (dispatch) => {
		dispatch(changeActive(2));
		//dispatch(discoverAction.resetDiscoverPage(1));
	}
};

export const handleHomeClick = () => {
	return (dispatch) => {
		dispatch(changeActive(1));
	}
}
