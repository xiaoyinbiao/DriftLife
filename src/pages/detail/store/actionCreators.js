import * as constants from './constants';
import api from '../../../API/url';
import * as utlis from '../../../statics/utils/changeTime';
import { message } from "antd";

const changeDetail = (data) => ({
	type: constants.CHANGE_DETAIL,
	articleId: data.articleId,
	title: data.articleTitle,
	articleUserId: data.userId,
	author: data.userName,
	finishTime: utlis.timestampToTime(parseInt(data.articleFinishTime)),
	categoryName: data.articleCategoryName,
	content: data.articleContent,
	articleState: data.articleState
});

const changeCommentValues = (value) => ({
	type: constants.CHANGE_COMMENT_VALUE,
	value
})

const addcomments = (commentsAddOne) => ({
	type: constants.ADD_COMMENTS,
	commentsAddOne
})

const changeArticleStates = (state) => ({
	type: constants.CHANGE_ARTICLE_STATES,
	state
})

const changeDrawerVisibles = (state) => ({
	type: constants.CHANGE_DRAWER_VISIBLE,
	state
})

const changeSubmitReplyState = (state) => ({
	type: constants.CHANGE_SUBMIT_REPLY_STATE,
	state
})

const changeReplyValues = (replyValue) => ({
	type: constants.CHANGE_REPLY_VALUE,
	replyValue
})

const changeReplyInfos = (toUserId,toArticleWordId) => ({
	type: constants.CHANGE_REPLY_INFO,
	toUserId,
	toArticleWordId
})

const changeReplyList = (data) => ({
	type: constants.CHANGE_REPLY_LIST,
	replyList: data
})

export const getDetail = (id) => {
	return (dispatch) => {
		const params = {
			articleId: id
		}
		api.getArticleAllInfo({params}).then((res) => {
			const result = res.data;
			dispatch(changeDetail(result));
		}).catch((e) => {
			console.log(e)
		})
	}
};

export const changeCommentValue = (commentValue) => {
	return (dispatch) => {
		dispatch(changeCommentValues(commentValue))
	}
}

//提交评论
export const submitComment = (currentUserId, articleUserId, articleId, commentValue, comments, userName) => {
	return (dispatch) => {
		const data = {
			articleWordUserId: currentUserId,
			articleWordContent: commentValue,
			userId: articleUserId,
			articleId: articleId
		}
		const commentToPage = {
			articleWordUserId: currentUserId,
			articleWordContent: commentValue,
			userId: articleUserId,
			articleId: articleId,
			userName: userName
		}
		let commentsAddOne = [
				commentToPage,
				...comments
		]
		api.insertArticleComment(data).then(res => {
			if(res.data) {
				dispatch(addcomments(commentsAddOne))
				message.success('添加评论成功');
			} else {
				message.error('添加评论失败');
			}
		}).catch(e => {
			console.log(e)
		})
	}
}

export const getCommentList = (articleId) => {
	return (dispatch) => {
		const params = {
			articleId: articleId
		}
		api.getArticleCommentList({params}).then(res => {
			console.log(res.data)
			dispatch(addcomments(res.data));
		}).catch(e => {
			console.log(e)
		})
	}
};

export const changeArticleState = (articleId, state) => {
	return (dispatch) => {
		const params = {
			articleId: articleId,
			state: state
		}
		api.changeArticleStatus({params}).then(res => {
			if(res.data) {
				dispatch(changeArticleStates(state))
				message.success('修改发布状态成功')
			} else {
				message.error('修改发布状态失败')
			}
		}).catch(e => {
			console.log(e)
		})
	}
};

export const changeLikeState = (state,currentUserId,articleId) => {
	return (dispatch) => {
		const params = {
			userId: currentUserId,
			articleId: articleId,
			state: state
		}
		api.changeUserManner({params}).then(res => {
			const data = res.data;
			if (data.result === true) {
				state === 1 ? message.success('点赞成功') : message.success('讨厌成功')
			} else if (data.result === 1) {
				message.info('你已经点过赞了哦')
			} else if (data.result === 2) {
				message.info('你已经点过讨厌了哦')
			}
		}).catch(e => {
			message.error('表态出错了')
		})
	}
};

export const collectArticle = (currentUserId,articleId) => {
	return (dispatch) => {
		const params = {
			userId: currentUserId,
			articleId: articleId
		}
		api.collectArticle({params}).then(res => {
			message.info(res.data.result)
		}).catch(e => {
			message.error('收藏出错了' + e)
		})
	}
};

export const deleteArticle = (userId,articleId) => {
	return (dispatch) => {
		const params = {
			userId: userId,
			articleId: articleId
		}
		api.deleteArticle({params}).then(res => {
			if (res.data) {
				message.success('删除成功')
			} else {
				message.info('删除失败')
			}
		}).catch(e => {
			message.error('删除出错')
		})
	}
};
export const changeDrawerVisible = (state) => {
	return (dispatch) => {
		dispatch(changeDrawerVisibles(state));
	}
};
export const changeSubmitReplyCancel = (state) => {
	return (dispatch) => {
		dispatch(changeSubmitReplyState(state))
	}
};
export const changeReplyValue = (repluValue) => {
	return (dispatch) => {
		dispatch(changeReplyValues(repluValue))
	}
};
//改变对谁回复，回复那条评论
export const changeReplyInfo = (toUserId,toArticleWordId) => {
	return (dispatch) => {
		dispatch(changeReplyInfos(toUserId,toArticleWordId))
	}
};
//提交回复
export const handleReplySubmit = (currentUserId, replyContent, articleReplyToPeopleId, articleReplyWordId, articleId) => {
	return (dispatch) => {
		const data = {
			articleReplyUserId: currentUserId,
			articleReplyContent: replyContent,
			articleReplyToUserId: articleReplyToPeopleId,
			articleWordId: articleReplyWordId,
			articleId: articleId
		}
		api.insertArticleReply(data).then(res => {
			if (res.data) {
				message.info('添加回复成功')
				dispatch(getReplyList(articleReplyWordId))
			} else {
				message.error('添加回复失败')
			}
		}).catch(e => {
			message.error('添加回复出错' + e)
		})
	}
};
//获取回去列表
export const getReplyList = (articleWordId) => {
	return (dispatch) => {
		const params = {
			articleWordId: articleWordId
		}
		api.getArticleReplyList({params}).then(res => {
			dispatch(changeReplyList(res.data))
		})
	}
}
