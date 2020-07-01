import React, { PureComponent } from 'react';
import Writer from '../home/components/Writer';
import {PageWrapper, PageRight, PageCenter} from "../../initStyle";
import { connect } from 'react-redux';
import { actionCreators } from './store'
import {
  Form,
  Input,
  Button,
  Avatar,
  Tabs
} from 'antd';
import {Link} from "react-router-dom";
import {ListBottom, ListInfo, ListItem } from "../discover/style";
import { LikeFilled, DislikeFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import {Tag, Modal} from "antd";

const { TabPane } = Tabs;
const { confirm } = Modal;

class UserCenter extends PureComponent{
  render() {
    const {userId, userName, account, password, sex, region, biography, updateUserInfo, changeTabPane, list, handleCancelCollect } = this.props
    return (
        <PageWrapper>
          <PageRight>
            <Writer></Writer>
          </PageRight>
          <PageCenter>
            <Tabs defaultActiveKey="1" onChange={(e) =>changeTabPane(e,userId)}>
              <TabPane tab="用户资料" key="1">
                <Form
                    name="register"
                    ref={this.formRef}
                    onFinish={(value) => updateUserInfo(value, userId)}
                    scrollToFirstError
                >
                  <Form.Item
                      name="userpic"
                      label="头像"
                  >
                    <Avatar style={{ backgroundColor: '#ea6f5a', verticalAlign: 'middle' }} size="large">
                      {userName}
                    </Avatar>
                  </Form.Item>

                  <Form.Item
                      name="name"
                      label="昵称"
                  >
                    <Input placeholder={userName} />
                  </Form.Item>

                  <Form.Item
                      name="account"
                      label="账号"
                  >
                    <Input placeholder={account} disabled  />
                  </Form.Item>

                  <Form.Item
                      name="password"
                      label="密码"
                  >
                    <Input.Password placeholder={password} />
                  </Form.Item>

                  <Form.Item
                      name="sex"
                      label="性别"
                  >
                    <Input placeholder={sex} />
                  </Form.Item>

                  <Form.Item
                      name="address"
                      label="地区"
                  >
                    <Input placeholder={region} />
                  </Form.Item>

                  <Form.Item
                      name="description"
                      label="个人简介"
                  >
                    <Input.TextArea  placeholder={biography} />
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                      修改
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
              <TabPane tab="用户收藏" key="2">
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
                              <Tag className='tag' color='red' onClick={(e) => handleCancelCollect(e, userId, item.articleId)}>取消收藏</Tag>
                            </ListBottom>
                          </ListItem>
                        </Link>
                    );
                  })
                }
              </TabPane>
            </Tabs>
          </PageCenter>
        </PageWrapper>
    )
  }
  componentDidMount() {
    this.props.getUserInfo(this.props.userId);
  }
}

const formItemLayout = {
  labelCol: {

  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 34 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 10,
    },
  },
};

const mapStateToProps = (state) => ({
  userId: state.getIn(['login','userId']),
  userName: state.getIn(['login','userName']),
  account: state.getIn(['userCenter','account']),
  password: state.getIn(['userCenter','password']),
  sex: state.getIn(['userCenter','sex']),
  region: state.getIn(['userCenter','region']),
  biography: state.getIn(['userCenter','biography']),
  list: state.getIn(['userCenter','collectArticleList'])
});

const mapDispatchToProps = (dispatch) => ({
  getUserInfo(userId) {
    dispatch(actionCreators.getUserInfo(userId));
  },
  updateUserInfo(value, userId) {
    dispatch(actionCreators.updateUserInfo(value,userId))
  },
  changeTabPane(e, userId) {
    if (e == 2) {
      dispatch(actionCreators.getCollectArticleList(userId))
    }
  },
  handleCancelCollect(e, userId, articleId ) {
    confirm({
      title: '您确定取消收藏吗?',
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        dispatch(actionCreators.handleCancelCollect(userId,articleId))
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    e.preventDefault()
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserCenter);
