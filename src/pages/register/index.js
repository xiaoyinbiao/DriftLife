import React, { PureComponent } from 'react';
import { RegisterWrapper, RegisterBox } from './style';
import axios from 'axios';
import { actionCreators } from './store' //引入actionCreators
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Button,
  Row,
  Col,
} from 'antd';
import { KeyOutlined } from '@ant-design/icons'

class Register extends PureComponent {
  render() {
    const { getCode, code, waitState, waitTime, handleGetCode, handleOnFinish } = this.props;
    const reg =  /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    return (
        <RegisterWrapper>
          <RegisterBox>
            <Form
                {...formItemLayout}
                name="register"
                ref={this.formRef}
                onFinish={(value) => handleOnFinish(value,code)}
                scrollToFirstError
            >
              <Form.Item
                  name="account"
                  label="账号"
                  rules={[
                    {
                      required: true,
                      message: '请输入账号',
                    },
                    () => ({
                      validator(rule, value) {
                        if (!value || value.length == 11 || reg.test(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject('不是手机号或邮箱！');
                      },
                    })
                  ]}
              >
                <Input placeholder='邮箱号/手机号' ref={(account) => {this.account = account}}/>
              </Form.Item>
              <Form.Item
                  name="password"
                  label="密码"
                  rules={[
                    {
                      required: true,
                      message: '请输入密码',
                    },
                    {
                      min: 6,
                      message: '密码不能少于6位哦'
                    }
                  ]}
                  hasFeedback
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                  name="confirm"
                  label="确认密码"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: '请输入确认密码',
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject('两次密码不一致哦！');
                      },
                    }),
                  ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                  {...codeLayout}
                  name="code"
                  label="验证码"
                  rules={[
                    {
                      required: true,
                      message: '请输入验证码',
                    }
                  ]}
              >
                <Row gutter={6}>
                  <Col span={20}>
                    <Input placeholder='请输入验证码' ref={(code) => {this.code = code}} />
                  </Col>
                  <Col span={4}>
                    <Button
                        icon={<KeyOutlined />}
                        loading={getCode}
                        disabled={ waitState }
                        onClick={() => handleGetCode(this.account)}
                    >
                      { waitState ? waitTime + 's后获取' : '获取验证码' }
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button htmlType="submit" type="primary">
                  注册
                </Button>
              </Form.Item>
            </Form>
          </RegisterBox>
        </RegisterWrapper>
    );
    }
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: {
      span: 5,
      offset: 1
    },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
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
const codeLayout = {
  wrapperCol: {
    span: 10,
  },
};

const mapState = (state) =>({
  getCode: state.getIn(['register', 'getCode']),
  code: state.getIn(['register','code']),
  waitTime: state.getIn(['register','waitTime']),
  waitState: state.getIn(['register','waitState'])
});

const mapDispatch = (dispatch) => ({
  handleGetCode(account) {
    dispatch(actionCreators.handleGetCode(account.props.value))
  },
  handleOnFinish(value, code) {
    console.log(value)
    console.log(code)  //可以直接用，不要下面的
    dispatch(actionCreators.handleOnFinish(value,code));
  }
})

export default connect(mapState, mapDispatch)(Register);
