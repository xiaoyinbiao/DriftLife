import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {
	LoginWrapper,
	LoginBox,
	//Input,
	//Button
} from './style';
import { actionCreators } from './store';
import "antd/dist/antd.css";
import {Form, Input, Button, Col, Row, Spin } from 'antd';

class Login extends PureComponent {
	render() {
		const { loginStatus, changeImgCode, imgUrl, handleLogin } = this.props;
		if (!loginStatus) {
			return (
				<LoginWrapper>
					<LoginBox>
						<Form
								{...layout}
								name="basic"
						>
							<Form.Item
									label="账号"
									name="username"
									rules={[
										{
											required: true,
											message: '请输入账号!',
										},
									]}
							>
								<Input ref={(input) => {this.account = input}} placeholder='邮箱号/手机号'/>
							</Form.Item>

							<Form.Item
									label="密码"
									name="password"
									rules={[
										{
											required: true,
											message: '请输入密码！',
										},
									]}
							>
								<Input.Password ref={(input) => {this.password = input}} />
							</Form.Item>

							<Form.Item
									{...codeLayout}
									label="验证码"
									name="code"
									rules={[
										{
											required: true,
											message: '请输入验证码！',
										},
									]}
							>
								<Row gutter={6}>
									<Col span={20}>
								    <Input ref={(node) => this.code = node} placeholder='请输入验证码'/>
									</Col>
									<Col span={4}>
										<img src={imgUrl} alt='图形验证码' onClick={changeImgCode} />
									</Col>
								</Row>
							</Form.Item>

							<Form.Item {...tailLayout}>
								<Button type="primary" htmlType="submit" onClick={() => handleLogin(this.account, this.password, this.code)}>
									登陆
								</Button>
							</Form.Item>
						</Form>
					</LoginBox>
				</LoginWrapper>
			)
		}else {
			return <Redirect push to='/' />
		}
	}
}

const layout = {
	labelCol: {
		span: 5,
	},
	wrapperCol: {
		span: 16,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 10,
		span: 16,
	},
};
const codeLayout = {
	wrapperCol: {
		span: 10,
	},
};


const mapState = (state) => ({
	loginStatus: state.getIn(['login', 'login']),
	imgUrl: state.getIn(['login','imgUrl'])
})

const mapDispatch = (dispatch) => ({
	handleLogin(accountElem, passwordElem, codeElem) {
		dispatch(actionCreators.login(accountElem.props.value, passwordElem.props.value, codeElem.input.value));
	},
	changeImgCode() {
		dispatch(actionCreators.changeImgCode())
	}
})

export default connect(mapState, mapDispatch)(Login);
