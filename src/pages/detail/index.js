import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { DetailWrapper, Header, Content, ArticleAuthor, PageFooter } from './style';
import { actionCreators } from './store';
import { PageCenter, PageRight } from "../../initStyle";
import Writer from '../home/components/Writer';
import { Tag, Button, message, Modal } from 'antd';
import { LikeFilled, DislikeFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import Comments from './compnents/Comments';
const { confirm } = Modal;

class Detail extends PureComponent {
	render() {
		const { articleId, loginStatus, currentUserId, articleUserId, title, author, finishTime, articleCategoryName,
			content, articleState, publishArticle, unPublishArticle, handleLikeClick, handleDislikeClick, handleCollectArticle,
			handleArticleDelete} = this.props
		return (
			<DetailWrapper>
				<PageRight>
					<Writer />
				</PageRight>
				<PageCenter>
					<Header>{title}</Header>
					<ArticleAuthor>
						<span className='item'>作者：{author}</span>
						<span className='item'>撰写时间：{finishTime}</span>
						<span className='item'>分类：{articleCategoryName}</span>
						{
							currentUserId == articleUserId ? parseInt(articleState) != 1 ? <Tag className='publish' onClick={() => publishArticle(articleId)}>发布</Tag> : <Tag className='publish' onClick={() => unPublishArticle(articleId)}>取消发布</Tag> : null
						}
						{
							currentUserId == articleUserId ? <Tag className='publish' onClick={() => handleArticleDelete(currentUserId, articleId)}>删除</Tag> : null
						}
					</ArticleAuthor>
					{/*定义样式可以到content里面去写*/}
					<Content
						dangerouslySetInnerHTML={{__html: content}}
					/>
					{
						parseInt(articleState) === 1 ?
						<PageFooter>
							<div className='footerLeft' />
							<div className='footerRight' />
							<div className='footerCenter'>
								<LikeFilled className='likeFill' onClick={() => handleLikeClick(currentUserId,articleId)} />
								<DislikeFilled className='likeFill' onClick={() => handleDislikeClick(currentUserId,articleId)} />
								<Tag className='tag' onClick={() => handleCollectArticle(currentUserId,articleId)}>收藏</Tag>
							</div>
						</PageFooter> : null
					}
					{ parseInt(articleState) === 1 ? <Comments /> : null }
				</PageCenter>
			</DetailWrapper>
		)
	}

	componentDidMount() {
		this.props.getDetail(this.props.match.params.id);
	}
}

const mapState = (state) => ({
	articleId: state.getIn(['detail','articleId']),
	loginStatus: state.getIn(['login','login']),
	currentUserId: state.getIn(['login','userId']),
	articleUserId: state.getIn(['detail','articleUserId']),
	title: state.getIn(['detail', 'title']),
	author: state.getIn(['detail','userName']),
	finishTime: state.getIn(['detail','time']),
	articleCategoryName: state.getIn(['detail','articleCategoryName']),
	content: state.getIn(['detail', 'content']),
	articleState: state.getIn(['detail','articleState'])
});

const mapDispatch = (dispatch) => ({
	getDetail(id) {
		dispatch(actionCreators.getDetail(id));
	},
	publishArticle(articleId) {
		const state = 1
		dispatch(actionCreators.changeArticleState(articleId, state))
	},
	unPublishArticle(articleId) {
		const state = 2
		dispatch(actionCreators.changeArticleState(articleId, state))
	},
  handleLikeClick(currentUserId,articleId) {
	  dispatch(actionCreators.changeLikeState(1,currentUserId,articleId))
  },
  handleDislikeClick(currentUserId,articleId) {
	  dispatch(actionCreators.changeLikeState(2,currentUserId,articleId))
  },
  handleCollectArticle(currentUserId,articleId) {
	  dispatch(actionCreators.collectArticle(currentUserId,articleId))
  },
	handleArticleDelete(userId, articleId) {
		confirm({
			title: '您确定删除文章吗?',
			icon: <ExclamationCircleOutlined />,
			okText: '确认',
			cancelText: '取消',
			onOk() {
				dispatch(actionCreators.deleteArticle(userId,articleId))
			},
			onCancel() {
				console.log('Cancel');
			},
		});
	}
});

export default connect(mapState, mapDispatch)(withRouter(Detail));
