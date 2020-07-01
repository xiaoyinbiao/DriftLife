import api from '../../../API/url';
import * as constants from './constants';
import { message } from "antd";
import {fromJS} from "immutable";

const changeDiscoverArticle = (data) => ({
  type: constants.CHANGE_DISCOVER_ARTICLE,
  list: data
})

const addDiscoverList = (list, nextPage) => ({
  type: constants.ADD_DISCOVER_LIDT,
  list: list,
  nextPage
})

const resetDiscoverPages = (page) => ({
  type: constants.RESET_DISCOVER_PAGE,
  page
})

export const getDiscoverArticleList = (page) => {
  return (dispatch) => {
    const data = {
      articleTitle: null,
      currentPage: page,
      pageSize: 4
    }
    api.getDiscoverArticleList(data).then(res => {
      dispatch(changeDiscoverArticle(res.data))
    }).catch(e => {
      console.log(e)
    })
  }
}

export const getMoreList = (page) => {
  return (dispatch) => {
    const data = {
      articleTitle: null,
      currentPage: page + 1,
      pageSize: 4
    }
    api.getDiscoverArticleList(data).then(res => {
      if (res.data.length > 0) {
        dispatch(addDiscoverList(res.data, page + 1))
      } else {
        dispatch(getDiscoverArticleList(1))
        dispatch(resetDiscoverPage(1))
        message.info('没有更多了，请重新加载试试')
      }
    }).catch(e => {
      console.log(e)
    })
  }
};

export const resetDiscoverPage = (page) => {
  return (dispatch) => {
    dispatch(resetDiscoverPages(page))
  }
}
