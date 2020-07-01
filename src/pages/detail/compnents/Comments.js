import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Comment, Avatar, Form, Button, List, Input, message, Tooltip, Drawer } from 'antd';
import { CommentWrapper } from '../style';
import { actionCreators } from '../store';
import * as utils from '../../../statics/utils/changeTime';
import { withRouter, Link } from 'react-router-dom';

const { TextArea } = Input;
const WordEditor = ({ onChange, onSubmit, submitting, value }) => (
    <div>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          添加评论
        </Button>
      </Form.Item>
    </div>
);
const ReplyEditor = ({ onChange, onSubmit, value, onSubmintReplyCancel }) => (
    <div>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit"  onClick={onSubmit} type="primary">
          添加回复
        </Button>
        <Button htmlType="submit" style={{marginLeft: '10px'}}  onClick={onSubmintReplyCancel} type="primary">
          取消回复
        </Button>
      </Form.Item>
    </div>
);


class Comments extends PureComponent {
  render() {
    const { loginStatus, comments, currentUserId, articleUserId, articleId,  userName, submitting,commentValue , drawerVisible,
      isReply, replyContent, handleReplyChange, handleReply, articleReplyToPeopleId, articleReplyWordId, handleReplySubmit, replyList,
      drawerClose,handleChange, handleSubmit, handleViewReply, handleSubmitReplyCancel } = this.props;
    return (
        <CommentWrapper>
          {/*回复显示框*/}
          <Drawer
              title="回复列表"
              placement="left"
              maskClosable={false}
              mask={false}
              width={300}
              onClose={drawerClose}
              visible={drawerVisible}
          >
            <List
                className="comment-list"
                header={`${replyList.length} 回复`}
                itemLayout="horizontal"
                dataSource={replyList}
                renderItem={item => (
                    <li>
                      <Comment
                          actions={[<span key="comment-list-reply-to-0" onClick={() => handleReply(item.articleReplyName, item.articleWordId)}>回复</span>]}
                          author={item.articleReplyNameNoId + '  回复  ' + item.articleReplyToPeopleName}
                          content={item.articleReplyContent}
                          datetime={utils.timestampToTime(item.articleReplyTime)}
                      />
                    </li>
                )}
            />
          </Drawer>

          <Comment
              avatar={
                <Avatar style={{ backgroundColor: '#ea6f5a', verticalAlign: 'middle' }}>
                  {userName}
                </Avatar>
              }
              content={
                !isReply ?
                <WordEditor
                    onChange={handleChange}
                    onSubmit={() => handleSubmit(currentUserId, articleUserId, articleId, commentValue,comments, loginStatus, userName)}
                    submitting={submitting}
                    value={commentValue}
                /> : <ReplyEditor
                        onChange={handleReplyChange}
                        onSubmit={() => handleReplySubmit(currentUserId, replyContent, articleReplyToPeopleId, articleReplyWordId, articleId)}
                        value={replyContent}
                        onSubmintReplyCancel={() => handleSubmitReplyCancel()}
                    />
              }
          />

          <List
              className="comment-list"
              header={`${comments.length} 评论`}
              itemLayout="horizontal"
              dataSource={comments}
              renderItem={item => (
                  <li>
                    <Comment
                        actions={[<span key="comment-list-reply-to-0" onClick={() => handleViewReply(item.articleWordId)}>查看回复</span> ,
                          <span key="comment-list-reply-to-0" onClick={() => handleReply(item.articleWordName, item.articleWordId)}>回复</span>]}
                        author={<Tooltip placement="bottom" title={<Link to={'/exchange/' + item.articleWordName + '/' + item.userName}>私聊</Link>}>{item.userName}</Tooltip>}
                        content={item.articleWordContent}
                        datetime={item.articleWordTime ? utils.timestampToTime(item.articleWordTime) : '刚刚'}
                    />
                  </li>
              )}
          />

        </CommentWrapper>
    )
  }

  componentDidMount() {
    console.log(this.props.articleId)   //此处有问题值得研究
    this.props.getCommentList(this.props.match.params.id)
  }
  componentWillUnmount() {
    this.props.drawerClose()
  }
}

const mapState = (state) => ({
  loginStatus: state.getIn(['login','login']),
  list: state.getIn(['home', 'topicList']),
  commentValue: state.getIn(['detail','submitCommentValue']),
  submitting: state.getIn(['detail','submitCommentState']),
  userName: state.getIn(['login','userName']),
  currentUserId: state.getIn(['login','userId']),
  articleUserId: state.getIn(['detail','articleUserId']),
  articleId: state.getIn(['detail','articleId']),
  comments: state.getIn(['detail','comments']),
  replyList: state.getIn(['detail','replyList']),
  drawerVisible: state.getIn(['detail','drawerVisible']),
  isReply: state.getIn(['detail','isReply']),
  replyContent: state.getIn(['detail','replyContent']),
  articleReplyToPeopleId: state.getIn(['detail','articleReplyToPeopleId']),
  articleReplyWordId: state.getIn(['detail','articleReplyWordId'])
});

const mapDispatch = (dispatch) => ({
  handleChange(e) {
    dispatch(actionCreators.changeCommentValue(e.target.value))
  },
  handleSubmit(currentUserId, articleUserId, articleId, commentValue, comments, loginStatus, userName) {
    if (!commentValue) {
      message.info('请输入评论内容')
      return
    }
    if(!loginStatus) {
      message.info('请先登陆')
      return
    }
    dispatch(actionCreators.submitComment(currentUserId, articleUserId, articleId, commentValue, comments, userName))
  },
  getCommentList(articleId) {
    dispatch(actionCreators.getCommentList(articleId))
  },
  handleViewReply(articleWordId) {
    dispatch(actionCreators.changeDrawerVisible(true))
    dispatch(actionCreators.getReplyList(articleWordId))
  },
  drawerClose() {
    dispatch(actionCreators.changeDrawerVisible(false))
  },
  handleSubmitReplyCancel() {
    dispatch(actionCreators.changeSubmitReplyCancel(false))
  },
  handleReplyChange(e) {
    dispatch(actionCreators.changeReplyValue(e.target.value))
  },
  //点击回复
  handleReply(toUserId, toArticleWordId) {
    dispatch(actionCreators.changeSubmitReplyCancel(true))
    dispatch(actionCreators.changeReplyInfo(toUserId, toArticleWordId))
  },
  //提交回复
  handleReplySubmit(currentUserId, replyContent, articleReplyToPeopleId, articleReplyWordId, articleId) {
    if (!replyContent) {
      message.info('请输入回复内容')
      return
    }
    if(currentUserId === 0) {
      message.info('请先登陆')
      return
    }
    dispatch(actionCreators.handleReplySubmit(currentUserId, replyContent, articleReplyToPeopleId, articleReplyWordId, articleId))
  }
})

export default connect(mapState, mapDispatch)(withRouter(Comments));
