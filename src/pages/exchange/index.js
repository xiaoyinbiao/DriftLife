import React, { PureComponent } from 'react';
import { PageWrapper, PageCenter, PageRight } from "../../initStyle";
import Writer from '../home/components/Writer';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import {Link} from "react-router-dom";
import { Menu, Input, List, Avatar } from "antd";
import { LikeFilled, DislikeFilled } from '@ant-design/icons';
import { withRouter } from "react-router-dom";
import {
  ExchangeRight,
  RightHeight,
  RightCenter,
  RightBottom
} from './style'

const { TextArea } = Input;
class Exchange extends PureComponent {
  render() {
    const { userId, userName, sendContent, sessionList, exchangeList, selectSession, headerName, friendId,
            changeEnter, changeContentValue, handleSessionClick } = this.props;
    return (
        <PageWrapper>
          <PageRight>
            <Writer />
          </PageRight>
          <PageCenter>
            <Menu
              theme='dark'
              style={{width: '22%', height: 600}}
              selectedKeys={[selectSession]}
              onClick={(e) => handleSessionClick(e)}
            >
              <Menu.Item disabled='true'>
                <Avatar>{userName}</Avatar><span style={{marginLeft: '5px'}}>{userName}</span>
              </Menu.Item>
              {
                sessionList.map(item => {
                  return (
                        <Menu.Item key={item.sessionId} friendid={item.friendId}>
                          {item.userId == userId ? item.friendName : item.userName}
                        </Menu.Item>
                      )
                })
              }
            </Menu>
            <ExchangeRight>
              <RightHeight>
                { headerName || this.props.match.params.userName}
              </RightHeight>
              <div  className='messageList' ref={(el) => { this.messagesEnd = el }}>
                <List
                    itemLayout="horizontal"
                    dataSource={exchangeList}
                    renderItem={item => (
                        <List.Item
                          style={{border: 'none'}}
                        >
                          <List.Item.Meta
                              title={<span>{item.userName}</span>}
                              description={item.messageContent}
                          />
                        </List.Item>
                    )}
                />
              </div>
              <RightBottom>
                <TextArea
                    value={sendContent}
                    style={{height: '120px'}}
                    onPressEnter={(e) => changeEnter(e, selectSession, sendContent, userId, friendId, userName)}
                    onChange={changeContentValue}
                />
              </RightBottom>
            </ExchangeRight>
          </PageCenter>
        </PageWrapper>
    )
  }

  scrollToBottom = () => {
    if (this.messagesEnd) {
      const scrollHeight = this.messagesEnd.scrollHeight;//实例div的实际高度
      const height = this.messagesEnd.clientHeight;  //实例可见区域高度
      const maxScrollTop = scrollHeight - height;
      this.messagesEnd.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount() {
    const { userId, openExchangeWs, getSessionList } = this.props
    if (this.props.match.params.toUserId != null) {
      actionCreators.changeFriendId(this.props.match.params.toUserId)
    }
    openExchangeWs(userId)
    getSessionList(userId, parseInt(this.props.match.params.toUserId), this.props.match.params.userName)  //第二个参数主要是为了判断这两个人有没有会话
  }
}

const mapState = (state) => ({
  userId: state.getIn(['login','userId']),
  userName: state.getIn(['login','userName']),
  exchangeList: state.getIn(['exchange','exchangeList']),
  sendContent: state.getIn(['exchange','sendContent']),
  sessionList: state.getIn(['exchange','sessionList']),
  selectSession: state.getIn(['exchange','selectSession']),
  headerName: state.getIn(['exchange','headerName']),
  friendId: state.getIn(['exchange', 'friendId'])
})
const mapDispatch = (dispatch) => ({
  openExchangeWs(userId) {
    dispatch(actionCreators.openExchangeWs(userId))
  },
  changeEnter(e, sessionId, messageContent, userId, friendId, userName) {
    e.preventDefault()
    dispatch(actionCreators.changeContentValue(''))
    dispatch(actionCreators.sendingContent(sessionId, messageContent, userId, friendId, userName))
  },
  changeContentValue(e) {
    dispatch(actionCreators.changeContentValue(e.target.value))
  },
  getSessionList(userId, otherId, otherName) {
    dispatch(actionCreators.getSessionList(userId, otherId, otherName))
  },
  handleSessionClick(e) {
    dispatch(actionCreators.changeSelectSession(e.key))
    dispatch(actionCreators.changeHeaderName(e.item.props.children))
    dispatch(actionCreators.changeFriendId(e.item.props.friendid))              //改变对方的用户id
    dispatch(actionCreators.getExchangeMessage(parseInt(e.key)))
  }
})

export default connect(mapState,mapDispatch)(withRouter(Exchange));
