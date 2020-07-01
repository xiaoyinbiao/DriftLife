import * as constants from './constants';
import api from '../../../API/url';
import { message } from "antd";
import { push } from "react-router-redux";

const changeEditInReducer = (html) => ({
  type: constants.CHANGE_EDIT_INREDUCER,
  html: html
})
const changeArticleId = (categoryId) => ({
  type: constants.CHANGE_ARTICLE_ID,
  categoryId: categoryId
})

export const changeEditContent = (html) => {
  return (dispatch) => {
    dispatch(changeEditInReducer(html))
  }
}
export const changeArticleCategoryId = (categoryId) => {
  return (dispatch) => {
    dispatch(changeArticleId(categoryId))
  }
}
export const saveArticle = (userId, articleCategory, title, content) => {
  return (dispatch) => {
    const data = {
      userId: userId,
      articleCategoryId: articleCategory,
      articleTitle: title,
      articleContent: content,
      articlePlace: ''         //地区暂时不写，发布的时候写？
    }
    api.saveArticle(data).then(res => {
      let result = res.data.result;
      if (result) {
        message.success('文章保存成功')
        dispatch(push('/'))
      } else {
        message.success('文章保存失败')
      }
    }).catch(e => {
      message.success('文章保存错误' + e)
    })
  }
}
