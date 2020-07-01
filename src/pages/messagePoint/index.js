import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Writer from '../home/components/Writer';
import { actionCreators } from './store';
import { Link } from "react-router-dom";
import {
  PageWrapper,
  PageCenter,
  PageRight
} from "../../initStyle";
import {
  ListWrapper,
  ListItemHeader,
  ListItemContent,
  ListItemArticle
} from "./style";
import {
  Tabs,
  Button,
  Badge
} from 'antd';

const { TabPane } = Tabs;
class MessagePoint extends PureComponent {

  render() {
    const { wordList, replyList, changeAllMessageState, changeWordStateById, changeReplyState } = this.props;
    const tabOperation = <Button size='small' onClick={changeAllMessageState}>将通知标为已读</Button>;
      return (
          <PageWrapper>
            <PageRight>
              <Writer />
            </PageRight>
            <PageCenter>
              <Tabs defaultActiveKey="1" tabBarExtraContent={tabOperation}>
                <TabPane tab="评论通知" key="1">
                  {
                    wordList.map((item,index) => {
                      return (
                          <ListWrapper key={index} onClick={() => changeWordStateById(item.articleWordId)}>
                            <ListItemHeader>
                              {item.userName + '评论了你的文章'}
                              {item.checkState === 0 ? <Badge dot /> : null}
                            </ListItemHeader>
                            <ListItemContent>
                              {item.articleWordContent}
                            </ListItemContent>
                            <ListItemArticle>
                              <Link className='article-title' to={'/detail/' + item.articleId}>
                                {item.articleTitle}
                              </Link>
                            </ListItemArticle>
                          </ListWrapper>
                      )
                    })
                  }
                </TabPane>
                <TabPane tab="回复通知" key="2">
                  {
                    replyList.map((item, index) => {
                      return (
                          <ListWrapper key={index} onClick={() => changeReplyState(item.replyId)}>
                            <ListItemHeader>
                              {item.articleReplyNameNoId + '回复了你的发言'}
                              {item.checkState === 0 ? <Badge dot /> : null}
                            </ListItemHeader>
                            <ListItemContent>
                              {item.articleReplyContent}
                            </ListItemContent>
                            <ListItemArticle>
                              <Link className='article-title' to={'/detail/' + item.articleId}>
                                { item.articleReplyToPeopleName + ":" + item.articleWordForReply}
                              </Link>
                            </ListItemArticle>
                          </ListWrapper>
                      )
                    })
                  }
                </TabPane>
              </Tabs>
            </PageCenter>
          </PageWrapper>
      )
  }

  componentDidMount() {
    const { userId, getWordList } = this.props
    getWordList(userId);
  }
  componentWillUnmount() {
    const { login, closeWebSocket } = this.props
    closeWebSocket(login)
  }
}

const mapState = (state) => ({
  userId: state.getIn(['login','userId']),
  login: state.getIn(['login','login']),
  wordList: state.getIn(['messagePoint','wordList']),
  replyList: state.getIn(['messagePoint','replyList'])
})

const mapDispatch = (dispatch) => ({
  getWordList(userId) {
    dispatch(actionCreators.getWordLists(userId))
  },
  closeWebSocket(login) {
    dispatch(actionCreators.closeWebSocket(login))
  },
  changeAllMessageState() {
    dispatch(actionCreators.changeMessageState(-1 ,-1))
  },
  changeWordStateById(articleWordId) {
    dispatch(actionCreators.changeMessageState(articleWordId, 0))
  },
  changeReplyState(replyId) {
    dispatch(actionCreators.changeMessageState(0, replyId))
  }
});

export default connect(mapState, mapDispatch)(MessagePoint);
