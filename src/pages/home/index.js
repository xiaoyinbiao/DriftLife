import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {Redirect} from "react-router-dom";
import SearchForm from './components/SeaechForm';
import List from './components/List';
import Writer from './components/Writer';
import AntMenu from './components/AntMenu'
import { actionCreators } from './store';
import { BackTop } from './style';

import { 
	HomeWrapper,
  HomeLeft,
	HomeCenter,
  HomeRight
} from './style';

class Home extends PureComponent {

	handleScrollTop() {
		window.scrollTo(0, 0);
	}

	render() {
		if (this.props.login) {
			return (
					<HomeWrapper>
						<HomeLeft>
							<AntMenu />
						</HomeLeft>
						<HomeRight>
							{/*<Recommend />*/}
							<Writer />
						</HomeRight>
						<HomeCenter>
							{/*<img className='banner-img' alt='' src="//upload.jianshu.io/admin_banners/web_images/4318/60781ff21df1d1b03f5f8459e4a1983c009175a5.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" />*/}
							{/*<Topic />*/}
							{ <SearchForm /> }
							<List />
						</HomeCenter>
						{ this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>顶部</BackTop> : null}
					</HomeWrapper>
			)
		} else {
			return <Redirect to='/login'/>
		}
	}

	componentDidMount() {
		const { userId, searchCategoryId, changeHomeData, getArticleCategory, searchArticleStatus } = this.props
		console.log('用户id' + userId);
		console.log('文章分类ID' + searchCategoryId)
		//changeHomeData();
		getArticleCategory(userId, searchCategoryId, searchArticleStatus); //获取文章分类并根据分类获取文章列表
		//初始获取文章列表放到getArticleCategory里会不会好点,不放里面要在刷新一次才行
		this.bindEvents();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.props.changeScrollTopShow);
	}

	bindEvents() {
		window.addEventListener('scroll', this.props.changeScrollTopShow);
	}

}

const mapState = (state) => ({
	login: state.getIn(['login','login']),
	showScroll: state.getIn(['home', 'showScroll']),
	userId: state.getIn(['login','userId']),
	searchCategoryId: state.getIn(['home','searchCategoryId']),
	searchArticleStatus: state.getIn(['detail','searchArticleStatus'])
})

const mapDispatch = (dispatch) => ({
	changeHomeData() {
		dispatch(actionCreators.getHomeInfo());
	},
	changeScrollTopShow() {
		if (document.documentElement.scrollTop > 100) {
			dispatch(actionCreators.toggleTopShow(true))
		}else {
			dispatch(actionCreators.toggleTopShow(false))
		}
	},
	getArticleCategory(userId, searchCategoryId, searchArticleStatus) {
	  if (userId === 0) return
		dispatch(actionCreators.getArticleCategory(userId, searchCategoryId, searchArticleStatus))
	}
});

export default connect(mapState, mapDispatch)(Home);
