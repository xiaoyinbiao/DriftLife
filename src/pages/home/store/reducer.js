import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	topicList: [],
	articleList: [],
	recommendList: [],
	articlePage: 1,
	showScroll: false,

	currentIndex: 0,
	menuContent: [],
	modalVisible: false,
	modalLoading: false,
	searchCategoryId: 0,
	searchArticleStatus: 0,
	searchArticleStartTime: null,
	searchArticleEndTime: null,
	searchArticleTitle: null,
	currentPage: 1,
	totalPage: 0,     //还没用到,实际是条数
	sentenceContent: '',
	sentenceSource: ''
});

const changeHomeData = (state, action) => {
	return state.merge({
		topicList: fromJS(action.topicList),
		articleList: fromJS(action.articleList),
		recommendList: fromJS(action.recommendList)
	});
};

const addArticleList = (state, action) => {
	return state.merge({
		'articleList': state.get('articleList').concat(action.list),
		'articlePage': action.nextPage
	});
};

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_HOME_DATA:
			return changeHomeData(state, action);
		case constants.ADD_ARTICLE_LIST:
			return addArticleList(state, action);
		case constants.TOGGLE_SCROLL_TOP:
			return state.set('showScroll', action.show);
		case constants.CHANGE_HOME_MENU:
			return state.merge({
				currentIndex: fromJS(action.currentIndex),
				searchCategoryId: fromJS(action.searchCategoryId)
			});
		case constants.CHANGE_ARTICLE_CATEGORY:
			return state.set('menuContent',action.data).set('searchCategoryId',action.data[0].articleCategoryId);
		case constants.SHOW_MODEL:
			return state.set('modalVisible', action.status);
		case constants.CHANGE_MODEL_LOADING:
			return state.set('modalLoading',action.status);
		case constants.CHANGE_SEARCH_VALUES:
			return state.merge({
				searchArticleStatus: fromJS(action.articleStatus),
				searchArticleStartTime: fromJS(action.articleBeginTime),
				searchArticleEndTime: fromJS(action.articleEndTime),
				searchArticleTitle: fromJS(action.articleTitle)
			});
		case constants.CHANGE_CURRENT_PAGE:
			return state.set('currentPage',action.currentPage);
		case constants.CHANGE_ARTICLE_LIST:
			return state.set('articleList',action.articleList);
		case constants.CHANGE_ARTICLE_COUNT:
			return state.set('totalPage',action.count);
		case constants.CHANGE_SENTENCE:
			return state.set('sentenceContent', action.data.content).set('sentenceSource', action.data.author);
		default:
			return state;
	}
}
