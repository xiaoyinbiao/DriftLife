import { fromJS } from 'immutable';
import * as constants from './constants';

const defaultState = fromJS({
  account: '',
  password: '',
  sex: '',
  region: '',
  biography: '',
  collectArticleList: []
});

export default (state = defaultState, action) => {
  switch(action.type) {
    case constants.GET_USER_INFOS:
      return state.merge({
        account: fromJS(action.account),
        password: fromJS(action.password),
        sex: fromJS(action.sex),
        region: fromJS(action.region),
        biography: fromJS(action.biography),
      });
    case constants.UPDATE_USER_INFO:
      return state.merge({
        account: fromJS(action.account),
        password: fromJS(action.password),
        sex: fromJS(action.sex),
        region: fromJS(action.region),
        biography: fromJS(action.biography),
      });
    case constants.CHANGE_COLLECT_LIST:
      return state.set('collectArticleList', action.List);
    case constants.DELETE_COLLECT_REDUX:
      return state.set('collectArticleList', action.data);
    default:
      return state;
  }
}
