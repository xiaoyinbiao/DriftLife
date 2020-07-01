import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  getCode: false,
  code: null,
  waitState: false,
  watiTime: 60
});

export default (state = defaultState, action) => {
  switch(action.type) {
    case constants.CHANGE_CODE:
      return state.merge({
        getCode: fromJS(false),
        code: fromJS(action.code)
      });
    case constants.CHANGE_CODE_STATE:
      return state.set('getCode', true);
    case constants.CHANGE_WAIT_STATE:
      return state.set('waitState',action.state);
    case constants.CHANGE_WIAT_TIME:
      return state.set('waitTime',action.time);
    default:
      return state;
  }
}
