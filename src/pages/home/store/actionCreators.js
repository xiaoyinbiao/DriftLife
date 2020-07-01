import axios from 'axios';
import * as constants from './constants';
import api from '../../../API/url';
import { fromJS } from 'immutable';
import { message } from "antd";

const changHomeData = (result) => ({
	type: constants.CHANGE_HOME_DATA,
	topicList: result.topicList,
	articleList: result.articleList,
	recommendList: result.recommendList
});

const addHomeList = (list, nextPage) => ({
	type: constants.ADD_ARTICLE_LIST,
	list: fromJS(list),
	nextPage
})

const changeHomeMenu = (index, searchCategoryId) => ({
	type: constants.CHANGE_HOME_MENU,
	currentIndex: index,
	searchCategoryId: searchCategoryId
})

const changeArticleCategory = (data) => ({
	type: constants.CHANGE_ARTICLE_CATEGORY,
	data: data
})

const changeModalState = (status) => ({
	type: constants.SHOW_MODEL,
	status: status
})

const changeModalLoding = (status) => ({
	type: constants.CHANGE_MODEL_LOADING,
	status: status
})

const changeSearchValues = (articleStatus, articleBeginTime, articleEndTime, articleTitle) => ({
	type: constants.CHANGE_SEARCH_VALUES,
	articleStatus,
	articleBeginTime,
	articleEndTime,
	articleTitle
})

const changeCurrentPages = (currentPage) => ({
	type: constants.CHANGE_CURRENT_PAGE,
	currentPage,
})

//改变文章列表
const changeArticleList = (data) => ({
	type: constants.CHANGE_ARTICLE_LIST,
	articleList: data
})

const changeArticleCount = (count) => ({
	type: constants.CHANGE_ARTICLE_COUNT,
	count
})

const changeSentence = (data) => ({
	type: constants.CHANGE_SENTENCE,
	data
})

export const getHomeInfo = () => {
	return (dispatch) => {
		axios.get('/api/home.json').then((res) => {
			const result = res.data.data;
			dispatch(changHomeData(result));
		});
	}
}

export const getMoreList = (page) => {
	return (dispatch) => {
		axios.get('/api/homeList.json?page=' + page).then((res) => {
			const result = res.data.data;
			dispatch(addHomeList(result, page + 1));
		});
	}
}

export const toggleTopShow = (show) => ({
	type: constants.TOGGLE_SCROLL_TOP,
	show
})

export const handleMenuClick = (e ,userId, searchCategoryId, searchArticleStatus, searchArticleStartTime, searchArticleEndTime, searchArticleTitle, currentPage) => {
  return (dispatch) => {
  	const nodeName = e.target.nodeName.toUpperCase();
		let tag = e.target;
		console.log(tag)
		const data = {
			userId: userId,
			articleCategoryId: parseInt(tag.getAttribute('data-categoryid')),
			articleState: searchArticleStatus,
			articleBeginTime: searchArticleStartTime,
			articleEndTime: searchArticleEndTime,
			currentPage: 1,            //这里改变了分类直接请求第一页的数据,并改变currnetPage为1，不然第二次请求的不是第一页的
			articleTitle: searchArticleTitle,
			pageSize: 4
		}
    dispatch(changeCurrentPages(1))    //改currentPage
		console.log(data)
		if (nodeName === 'LI') {
			let index = parseInt(tag.getAttribute('data-index'))
			let searchCategoryId = parseInt(tag.getAttribute('data-categoryid'))
			index!=null && dispatch(changeHomeMenu(index, searchCategoryId))
			api.getArticleList(data).then(res => {
				console.log(res)
				dispatch(changeArticleList(res.data))
			}).catch(e => {
				console.log(e)
			})
			//获取总数start
			const data1 = {
				userId: userId,
				articleCategoryId: parseInt(tag.getAttribute('data-categoryid')),
				articleState: searchArticleStatus,
				articleBeginTime: searchArticleStartTime,
				articleEndTime: searchArticleEndTime,
				articleTitle: searchArticleTitle,
			}
			api.getArticleCount(data1).then(res => {
				dispatch(changeArticleCount(res.data.count))
			}).catch(e => {
				console.log(e)
			})
		}
	}
}

export const getArticleCategory = (userId, searchCategoryId, searchArticleStatus) => {
	return (dispatch) => {
		console.log(userId)
		const params = {
			userId: userId
		}
		api.getArticleCategory({params}).then(res => {
			console.log(res.data)
			let articleCategoryId = res.data[0].articleCategoryId
			dispatch(changeArticleCategory(res.data))
      dispatch(changeHomeMenu(0,articleCategoryId))    //将active项和类id都调到第一个
			//begin获取文章列表
			const data = {
				userId: userId,
				articleCategoryId: articleCategoryId,
				articleState: searchArticleStatus,
				currentPage: 1,
				pageSize: 4
			}
			api.getArticleList(data).then(res => {
				let data = res.data
				console.log(data)
				dispatch(changeArticleList(data))
			}).catch(e => {
				console.log(e)
			})
      //end
			//获取总数start
			const data1 = {
				userId: userId,
				articleCategoryId: articleCategoryId,
				articleState: searchArticleStatus,
			}
			api.getArticleCount(data1).then(res => {
				dispatch(changeArticleCount(res.data.count))
			}).catch(e => {
				console.log(e)
			})
		}).catch(e => {
			message.error('获取分类出错了' + e)
		})
	}
}

export const showModal = (status) => {
	return (dispatch) => {
		dispatch(changeModalState(status))
	}
}

export const addNewCategory = (userId ,value) => {
	return (dispatch) => {
		if (userId == 0) return
		const params = {
			userId: userId,
			articleCategoryName: value
		}
		api.addNewCategory({params}).then(res => {
			if (res.data) {
				message.success('添加分类成功')
				dispatch(getArticleCategory(userId))
			} else {
				message.error('添加失败')
			}
			dispatch(changeModalLoding(false))
		}).catch(e => {
			message.error('添加错误' + e)
			dispatch(changeModalLoding(false))
		})
	}
}

export const modelLoading = (status) => {
	return (dispatch) => {
		dispatch(changeModalLoding(status))
	}
}

export const changeSearchValue = (articleStatus, articleBeginTime, articleEndTime, articleTitle) => {
	return (dispatch) => {
		dispatch(changeSearchValues(articleStatus, articleBeginTime, articleEndTime, articleTitle))
	}
}

export const changeCurrentPage = (currentPage, userId, searchCategoryId, searchArticleStatus, searchArticleStartTime, searchArticleEndTime, searchArticleTitle) => {
	return (dispatch) => {
		dispatch(changeCurrentPages(currentPage))
		const data = {
			userId: userId,
			articleCategoryId: parseInt(searchCategoryId),
			articleState: searchArticleStatus,
			articleBeginTime: searchArticleStartTime,
			articleEndTime: searchArticleEndTime,
			currentPage: currentPage,
			articleTitle: searchArticleTitle,
			pageSize: 4
		}

		//这个地方很奇怪啊（不是 这个地方），为什么改变redux里的搜索条件会自动触发请求，导致这里改变页面的请求重复了一遍
		// api.getArticleList(data).then(res => {
		// 	console.log(res)
		// 	dispatch(changeArticleList(res.data))
		// }).catch(e => {
		// 	console.log(e)
		// })
		//获取总数start
		const data1 = {
			userId: userId,
			articleCategoryId: parseInt(searchCategoryId),
			articleState: searchArticleStatus,
			articleBeginTime: searchArticleStartTime,
			articleEndTime: searchArticleEndTime,
			articleTitle: searchArticleTitle,
		}
		api.getArticleCount(data1).then(res => {
			dispatch(changeArticleCount(res.data.count))
		}).catch(e => {
			console.log(e)
		})
	}
}

//登陆获取文章列表
export const getArticleList = (userId, searchCategoryId) => {
	return (dispatch) => {
		const data = {
			userId: userId,
			articleCategoryId: searchCategoryId,
			articleState: 0,
			currentPage: 1,
			pageSize: 4
		}
		api.getArticleList(data).then(res => {
			let data = res.data
			console.log(data)
			dispatch(changeArticleList(data))
		}).catch(e => {
			console.log(e)
		})
	}
}

//搜索
export const handleSearchArticle = (userId, searchCategoryId, searchArticleStatus, searchArticleStartTime, searchArticleEndTime, searchArticleTitle, currentPage) => {
	return (dispatch) => {
		const data = {
			userId: userId,
			articleCategoryId: parseInt(searchCategoryId),
			articleState: searchArticleStatus,
			articleBeginTime: searchArticleStartTime,
			articleEndTime: searchArticleEndTime,
			currentPage: currentPage,
			articleTitle: searchArticleTitle,
			pageSize: 4
		}
		api.getArticleList(data).then(res => {
			console.log(res)
			dispatch(changeArticleList(res.data))
		}).catch(e => {
			console.log(e)
		})
		//获取总数start
		const data1 = {
			userId: userId,
			articleCategoryId: parseInt(searchCategoryId),
			articleState: searchArticleStatus,
			articleBeginTime: searchArticleStartTime,
			articleEndTime: searchArticleEndTime,
			articleTitle: searchArticleTitle,
		}
		api.getArticleCount(data1).then(res => {
			dispatch(changeArticleCount(res.data.count))
		}).catch(e => {
			console.log(e)
		})
	}
};

export const deleteCategory = (userId, articleCategoryId) => {
	return (dispatch) => {
		const params = {
			userId: userId,
			articleCategoryId: articleCategoryId
		}
		api.deleteCategory({params}).then(res => {
			if (res.data) {
				message.success('删除分类成功')
			} else {
				message.success('删除分类失败')
			}
		}).catch(e => {
			message.info('删除分类出错,分类下有文章不能删除哦')
		})
	}
}

export const getSentence = () => {
	return (dispatch) => {
		api.getSentence().then(res => {
			dispatch(changeSentence(res.data))
		}).catch(e => {
			message.error('获取美句失败')
		})
	}
}
