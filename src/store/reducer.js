import { combineReducers } from 'redux-immutable';
import { reducer as headerReducer } from '../common/header/store';
import { reducer as homeReducer } from '../pages/home/store';
import { reducer as detailReducer } from '../pages/detail/store';
import { reducer as loginReducer } from '../pages/login/store';
import { reducer as registerReducer } from '../pages/register/store';
import { reducer as userCenterReducer } from '../pages/userCenter/store';
import { reducer as writerReducer } from '../pages/write/store';
import { reducer as discoverReducer } from '../pages/discover/store';
import { reducer as messagePointReducer } from '../pages/messagePoint/store';
import { reducer as exchangeReducer } from '../pages/exchange/store';

//immutable统一数据格式
//state变成immutable对象
const reducer = combineReducers({
	header: headerReducer,
	home: homeReducer,
	detail: detailReducer,
	login: loginReducer,
	register: registerReducer,
	userCenter: userCenterReducer,
	writer: writerReducer,
	discover: discoverReducer,
	messagePoint: messagePointReducer,
	exchange: exchangeReducer
});

export default reducer;
