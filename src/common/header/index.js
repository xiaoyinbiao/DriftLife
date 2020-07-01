import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { actionCreators } from './store';
import { actionCreators as loginActionCreators } from '../../pages/login/store';
import { actionCreators as messagePointActionCreators } from "../../pages/messagePoint/store";
import { withRouter } from 'react-router-dom';
import { cityData } from '../../statics/data/data';
import {
	HeaderWrapper,
	Logo,
	HeaderLogo,
	Nav,
	NavItem,
	SearchWrapper,
	NavSearch,
	SearchInfo,
	SearchInfoTitle,
	SearchInfoSwitch,
	SearchInfoList,
	SearchInfoItem,
	Addition,
	Button,
	HeaderLogoItem
} from './style';
import {
	Avatar,
	Cascader,
  Badge
} from 'antd';
import {
  CommentOutlined,
  BellTwoTone
} from '@ant-design/icons';
import store from "../../store";

class Header extends Component {

	getListArea() {
		const { focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props;
		const newList = list.toJS();
		const pageList = [];

		if (newList.length) {
			for (let i = (page - 1) * 10; i < page * 10; i++) {
				pageList.push(
					<SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
				)
			}
		}

		if (focused || mouseIn) {
			return (
				<SearchInfo 
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				>
					<SearchInfoTitle>
						热门搜索
						<SearchInfoSwitch 
							onClick={() => handleChangePage(page, totalPage, this.spinIcon)}
						>
							<i ref={(icon) => {this.spinIcon = icon}} className="iconfont spin">&#xe851;</i>
							换一批
						</SearchInfoSwitch>
					</SearchInfoTitle>
					<SearchInfoList>
						{pageList}
					</SearchInfoList>
				</SearchInfo>
			)
		}else {
			return null;
		}
	}

	render() {
		const { active, focused, handleInputFocus, handleInputBlur, list, login, logout, userName, messageCount, handleHomeClick, handleDiscoverClick } = this.props;
		return (
			<HeaderWrapper>
				<Link to='/'>
					<Logo/>
				</Link>
				<HeaderLogo>
					<Link className='link' to='/'>
					  漂流生活
					</Link>
					<HeaderLogoItem>-记录美好生活</HeaderLogoItem>
				</HeaderLogo>
				<Nav>
					<Link to='/'>
						<NavItem className={ active == 1 ? 'left active' : 'left'} onClick={handleHomeClick}>首页</NavItem>
					</Link>
					<Link to='/discover'>
						<NavItem className={active == 2 ? 'left active' : 'left'} onClick={handleDiscoverClick}>发现</NavItem>
					</Link>
					{
						login ?
							<NavItem className='right'>
								<NavItem onClick={logout} className='right'>退出</NavItem>
								欢迎您，
								<Link to='/userCenter'>
									<Avatar style={{ backgroundColor: '#ea6f5a', verticalAlign: 'middle' }} size="large">
										{userName}
									</Avatar>
								</Link>
							</NavItem> :
							<Link to='/login'><NavItem className='right'>登陆</NavItem></Link>
					}
					<NavItem className='right'>
						{/*<Cascader options={cityData}>*/}
							{/*<a href="#">[请选择地区]</a>*/}
						{/*</Cascader>*/}
						<Link to='/exchange/null/null'>
							<CommentOutlined twoToneColor='#ea6f5a' style={{fontSize: '25px', color: '#ea6f5a',marginRight: '5px'}} />
						</Link>
            <Badge count={messageCount}>
							<Link to='/messagePoint'>
								<BellTwoTone twoToneColor='#ea6f5a' style={{fontSize: '25px'}} />
							</Link>
            </Badge>
					</NavItem>
					{/*<SearchWrapper>*/}
						{/*<CSSTransition*/}
							{/*in={focused}*/}
							{/*timeout={200}*/}
							{/*classNames="slide"*/}
						{/*>*/}
							{/*<NavSearch*/}
								{/*className={focused ? 'focused': ''}*/}
								{/*onFocus={() => handleInputFocus(list)}*/}
								{/*onBlur={handleInputBlur}*/}
							{/*></NavSearch>*/}
						{/*</CSSTransition>*/}
						{/*<i className={focused ? 'focused iconfont zoom': 'iconfont zoom'}>*/}
							{/*&#xe614;*/}
						{/*</i>*/}
						{/*/!*{this.getListArea()}*!/*/}
					{/*</SearchWrapper>*/}
				</Nav>
				<Addition>
					<Link to='/write'>
						<Button className='writting'>
							<i className="iconfont">&#xe615;</i>
							写文章
						</Button>
					</Link>
					<Link to='/register'>
					  <Button className='reg'>注册</Button>
					</Link>
				</Addition>
			</HeaderWrapper>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		focused: state.getIn(['header', 'focused']), //immutable对象获取这个属性和值的方法  统一数据获取方法
		list: state.getIn(['header', 'list']),
		page: state.getIn(['header', 'page']),
		totalPage: state.getIn(['header', 'totalPage']),
		mouseIn: state.getIn(['header', 'mouseIn']),
		active: state.getIn(['header','active']),
		login: state.getIn(['login', 'login']),
		userName: state.getIn(['login','userName']),
		userId: state.getIn(['login','userId']),
		messageCount: state.getIn(['messagePoint','count'])
	}
}

const mapDispathToProps = (dispatch) => {
	return {
		handleInputFocus(list) {
			(list.size === 0) && dispatch(actionCreators.getList());
			dispatch(actionCreators.searchFocus());
		},
		handleInputBlur() {
			dispatch(actionCreators.searchBlur());
		},
		handleMouseEnter() {
			dispatch(actionCreators.mouseEnter());
		},
		handleMouseLeave() {
			dispatch(actionCreators.mouseLeave());
		},
		handleChangePage(page, totalPage, spin) {
			let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
			if (originAngle) {
				originAngle = parseInt(originAngle, 10);
			}else {
				originAngle = 0;
			}
			spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';

			if (page < totalPage) {
				dispatch(actionCreators.changePage(page + 1));
			}else {
				dispatch(actionCreators.changePage(1));
			}
		},
		logout() {
			dispatch(loginActionCreators.logouting())
		},
		handleDiscoverClick() {
			dispatch(actionCreators.handleDiscoverClick())
		},
		handleHomeClick() {
			dispatch(actionCreators.handleHomeClick())
		}
	}
}

export default connect(mapStateToProps, mapDispathToProps)(withRouter(Header));
