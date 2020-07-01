import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
	articleId: null,
	title: '',
	articleUserId: '',
	userName: '',
	time: '',
	articleCategoryName: '',
	content: '',
	articleState: null,
	comments: [],       //评论列表
	replyList: [],      //回复列表
	submitCommentValue: '',
	submitCommentState: false,  //提交状态：是否在提交中，暂时没用到
	drawerVisible: false,      //抽屉显示
	isReply: false,           //是不是回复
	replyContent: '',          //回复内容
	articleReplyToPeopleId: null,  //给谁回复
	articleReplyWordId: null       //给那条评论回复
});

export default (state = defaultState, action) => {
	switch(action.type) {
		case constants.CHANGE_DETAIL:
			return state.merge({
				articleId: action.articleId,
				title: action.title,
				articleUserId: action.articleUserId,
				userName: action.author,
				time: action.finishTime,
				articleCategoryName: action.categoryName,
				content: action.content,
				articleState: action.articleState
			});
		case constants.CHANGE_COMMENT_VALUE:
			return state.set('submitCommentValue',action.value);
		case constants.ADD_COMMENTS:
			return state.set('comments',action.commentsAddOne);
		case constants.CHANGE_ARTICLE_STATES:
			return state.set('articleState',action.state);
		case constants.CHANGE_DRAWER_VISIBLE:
			return state.set('drawerVisible',action.state);
		case constants.CHANGE_SUBMIT_REPLY_STATE:
			return state.set('isReply',action.state);
		case constants.CHANGE_REPLY_VALUE:
			return state.set('replyContent',action.replyValue);
		case constants.CHANGE_REPLY_INFO:
			return state.merge({
				articleReplyToPeopleId: action.toUserId,
				articleReplyWordId: action.toArticleWordId
			});
		case constants.CHANGE_REPLY_LIST:
			return state.set('replyList',action.replyList);
		default:
			return state;
	}
}
