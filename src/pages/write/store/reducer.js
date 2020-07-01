import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  editorCategory: null,
  editorContent: ''
});

export default (state = defaultState, action) => {
  switch(action.type) {
    case constants.CHANGE_EDIT_INREDUCER:
      return state.set('editorContent',action.html);
    case constants.CHANGE_ARTICLE_ID:
      return state.set('editorCategory',action.categoryId);
    default:
      return state;
  }
}
