import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  discoverArticlePage: 1,
  discoverArticleList: []
});

export default (state = defaultState, action) => {
  switch(action.type) {
    case constants.CHANGE_DISCOVER_ARTICLE:
      return state.set('discoverArticleList',action.list);
    case constants.ADD_DISCOVER_LIDT:
      return state.set('discoverArticlePage', action.nextPage).set('discoverArticleList', action.list);
    case constants.RESET_DISCOVER_PAGE:
      return state.set('discoverArticlePage',action.page)
    default:
      return state;
  }
}
