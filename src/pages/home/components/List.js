import React, { PureComponent } from 'react';
import { ListItem, ListInfo, LoadMore, Page, ListBottom } from '../style';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { Link } from 'react-router-dom';
import { Pagination, Tag } from 'antd';
import { LikeFilled, DislikeFilled } from '@ant-design/icons';

class List extends PureComponent {
	render() {
		const { list, getMoreList, page, currentPage, handlePageChange, total, userId, searchCategoryId, searchArticleStatus, searchArticleStartTime, searchArticleEndTime, searchArticleTitle } = this.props;
		return (
			<div>
				{
					list.map((item, index) => {
						return (
							<Link key={index} to={'/detail/' + item.articleId}>
								<ListItem >
									<ListInfo>
										<h3 className='title'>{item.articleTitle}</h3>
										<p className='desc'
											 dangerouslySetInnerHTML={{__html: item.articleContent}}
										/>
									</ListInfo>
									<ListBottom>
										<LikeFilled className='positive'/> {item.articlePositive}
										<DislikeFilled className='negative' /> {item.articleNegative}
										{  item.articleState === 1 ? <Tag color="green" className='tag'>已发布</Tag> : null }
									</ListBottom>
								</ListItem>
							</Link>
						);
					})
				}
				{/*<LoadMore onClick={() => getMoreList(page)}>更多文字</LoadMore>*/}
				<Page>
				  <Pagination current={currentPage} onChange={(currentPage) => handlePageChange(currentPage, userId, searchCategoryId, searchArticleStatus, searchArticleStartTime, searchArticleEndTime, searchArticleTitle)} total={total} pageSize={4} />
				</Page>
			</div>
		)
	}
}

const mapState = (state) => ({
	list: state.getIn(['home', 'articleList']),
	page: state.getIn(['home', 'articlePage']),
	currentPage: state.getIn(['home','currentPage']), //
	total: state.getIn(['home','totalPage']),
	userId: state.getIn(['login','userId']), //
	searchCategoryId: state.getIn(['home','searchCategoryId']), //
	searchArticleStatus: state.getIn(['home','searchArticleStatus']), //
	searchArticleStartTime: state.getIn(['home','searchArticleStartTime']), //
	searchArticleEndTime: state.getIn(['home','searchArticleEndTime']), //
	searchArticleTitle: state.getIn(['home','searchArticleTitle']), //
});

const mapDispatch = (dispatch) => ({
	getMoreList(page) {
		dispatch(actionCreators.getMoreList(page))
	},
	handlePageChange(currentPage, userId, searchCategoryId, searchArticleStatus, searchArticleStartTime, searchArticleEndTime, searchArticleTitle) {
		dispatch(actionCreators.changeCurrentPage(currentPage, userId, searchCategoryId, searchArticleStatus, searchArticleStartTime, searchArticleEndTime, searchArticleTitle))
	}
})

export default connect(mapState, mapDispatch)(List);
