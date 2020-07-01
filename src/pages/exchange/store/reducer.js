import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  friendList: [],
  exchangeList: [],
  sessionList: [],
  sendContent: '',
  selectSession: null,
  headerName: null,
  friendId: null            //发送消息需要的对方用户id
});

export default (state = defaultState, action) => {
  switch(action.type) {
    case constants.CHANGE_EXCHANGE_LIST:
      return state.set('exchangeList', state.get('exchangeList').concat(action.exchangeList));
    case constants.CHANGE_CONTENT_VALUES:
      return state.set('sendContent', action.contentValue);
    case constants.CHANGE_SESSION_LIST:
      return state.set('sessionList', action.sessionList);
    case constants.ADD_LOACAL_SESSION:
      return state.set('sessionList', state.get('sessionList').concat(action.localSession));
    case constants.CHANGE_SELECT_SESSION:
      return state.set('selectSession', action.data);
    case constants.CHANGE_HEADER_NAME:
      return state.set('headerName', action.data);
    case constants.RESET_EXCHANGE_LIST:
      return state.set('exchangeList', action.data);
    case constants.CHANGE_FRIEND_ID:
      return state.set('friendId', parseInt(action.friendId));
    default:
      return state;
  }
}
