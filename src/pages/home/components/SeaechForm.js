import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { SearchWrapper } from '../style';
import { Form, Input, Button, Select, Col, Row, DatePicker } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { actionCreators } from '../store';


const { RangePicker } = DatePicker;

class SeaechForm extends PureComponent{
  render() {
    const { searchForm, userId, searchCategoryId, searchArticleStatus, searchArticleStartTime, searchArticleEndTime, searchArticleTitle, currentPage, handleSearchArticle } = this.props;
    return (
        <SearchWrapper>
          <Form
              onFieldsChange={(changeValue, allValue) => searchForm(changeValue, allValue)}
              className='form-bottom'
          >
            <Row gutter={3}>
              <Col span={5}>
                <Form.Item label="文章状态" name="articleStatus">
                  <Select placeholder="请选择" defaultValue={searchArticleStatus.toString()}>
                    <Select.Option value="0">全部</Select.Option>
                    <Select.Option value="1">发布</Select.Option>
                    <Select.Option value="2">未发布</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="时间范围" name="articleTime">
                  <RangePicker />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="文章标题" name="articleTitle">
                  <Input placeholder="请输入文章标题" />
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item>
                  <Button
                      icon={ <SearchOutlined />}
                      onClick={handleSearchArticle(userId, searchCategoryId, searchArticleStatus, searchArticleStartTime, searchArticleEndTime, searchArticleTitle, currentPage)}
                      htmlType="submit">
                    搜索
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </SearchWrapper>
    );
  }
}

const mapState = (state) => ({
  userId: state.getIn(['login','userId']),
  searchCategoryId: state.getIn(['home','searchCategoryId']),
  searchArticleStatus: state.getIn(['home','searchArticleStatus']),
  searchArticleStartTime: state.getIn(['home','searchArticleStartTime']),
  searchArticleEndTime: state.getIn(['home','searchArticleEndTime']),
  searchArticleTitle: state.getIn(['home','searchArticleTitle']),
  currentPage: state.getIn(['home','currentPage'])
})

const mapDispatch = (dispatch) => ({
  searchForm(changeValue,allValue) {
    let articleStatus
    let articleBeginTime
    let articleEndTime
    let articleTitle
    console.log(allValue)
    for (let i = 0; i < allValue.length; i++) {
      let name = allValue[i].name[0]
      if (name === 'articleStatus') {
        if (parseInt(allValue[i].value)) {
          articleStatus = parseInt(allValue[i].value)
        } else {
          articleStatus = 0
        }
      }
      if (name === 'articleTime') {
        if (allValue[i].value) {
          articleBeginTime = allValue[i].value[0].format('YYYY-MM-DD HH:mm:ss')
          articleEndTime = allValue[i].value[1].format('YYYY-MM-DD HH:mm:ss')
        } else {
          //不知道要不要补
        }
      }
      if (name === 'articleTitle') {
        articleTitle = allValue[i].value
      }
    }
    dispatch(actionCreators.changeSearchValue(articleStatus, articleBeginTime, articleEndTime, articleTitle))
  },
  handleSearchArticle(userId, searchCategoryId, searchArticleStatus, searchArticleStartTime, searchArticleEndTime, searchArticleTitle, currentPage) {
    dispatch(actionCreators.handleSearchArticle(userId, searchCategoryId, searchArticleStatus, searchArticleStartTime, searchArticleEndTime, searchArticleTitle, currentPage))
  }
})

export default connect(mapState, mapDispatch)(SeaechForm)
