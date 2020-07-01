import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  wordList: [],
  replyList: [],
  count: 0
});


export default (state = defaultState, action) => {
  switch(action.type) {
    case constants.CHANGE_WORD_LISTS:
      return state.set('wordList', action.wordList);
    case constants.CHANGE_REPLY_LISTS:
      return state.set('replyList', action.replyList);
    case constants.CHANGE_COUNT:
      return state.set('count',action.count);
    default:
      return state;
  }
}
