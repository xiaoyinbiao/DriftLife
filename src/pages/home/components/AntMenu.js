import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store';
import { MenuWrapper, MenuUl, MenuLi, MenuHeader, MenuBottom } from '../style';
import "antd/dist/antd.css";
import { Modal, Button,Input, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;
class AntMenu extends PureComponent{
  render() {
    const { userId, menuContent, currentIndex, modalVisible, modalLoading, handleMenuClick, showModal, handleOk, handleCancel,
      searchCategoryId, searchArticleStatus, searchArticleStartTime, searchArticleEndTime, searchArticleTitle, currentPage,
      handleDeleteCategory} = this.props;
    return (
      <MenuWrapper>
        <MenuUl onClick={(e) => handleMenuClick(e, userId ,searchCategoryId, searchArticleStatus, searchArticleStartTime, searchArticleEndTime, searchArticleTitle, currentPage)}>
          <MenuHeader>文章分类</MenuHeader>
          {
            menuContent.map((item, index) => {
              return (
                  <MenuLi
                    key={index}
                    data-index= {index}
                    data-categoryid = {item.articleCategoryId}
                    className={currentIndex === index ? 'active' : ''}
                  >{item.articleCategoryName}</MenuLi>
              )
            })
          }
        </MenuUl>
        <MenuBottom>
          <Button className='MenuBottom' onClick={ showModal }>新建分类</Button>
          <Button className='MenuBottom' onClick={() => {handleDeleteCategory(userId, currentIndex, menuContent)}}>删除分类</Button>
        </MenuBottom>

        <Modal
            visible={modalVisible}
            title="新增文章分类"
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={() => handleCancel()} >
                返回
              </Button>,
              <Button key="submit" type="primary" loading={modalLoading} onClick={() => handleOk(userId, this.inputValue)} >
                添加
              </Button>,
            ]}
        >
          <Input placeholder='请输入新的分类名' ref={(input) => {this.inputValue = input}} />
        </Modal>
      </MenuWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.getIn(['login','userId']),
    menuContent: state.getIn(['home','menuContent']),
    currentIndex: state.getIn(['home','currentIndex']),
    modalVisible: state.getIn(['home','modalVisible']),
    modalLoading: state.getIn(['home','modalLoading']),
    searchCategoryId: state.getIn(['home','searchCategoryId']),
    searchArticleStatus: state.getIn(['home','searchArticleStatus']),
    searchArticleStartTime: state.getIn(['home','searchArticleStartTime']),
    searchArticleEndTime: state.getIn(['home','searchArticleEndTime']),
    searchArticleTitle: state.getIn(['home','searchArticleTitle']),
    currentPage: state.getIn(['home','currentPage'])
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleMenuClick(e, userId, searchCategoryId, searchArticleStatus, searchArticleStartTime, searchArticleEndTime, searchArticleTitle, currentPage) {
      dispatch(actionCreators.handleMenuClick(e, userId, searchCategoryId, searchArticleStatus, searchArticleStartTime, searchArticleEndTime, searchArticleTitle, currentPage))
    },
    showModal() {
      dispatch(actionCreators.showModal(true))
    },
    handleCancel() {
      dispatch(actionCreators.showModal(false))
    },
    handleOk(userId, node) {
      if (!node.input.value) { message.info('分类名不能为空'); return }
      dispatch(actionCreators.modelLoading(true))
      dispatch(actionCreators.addNewCategory(userId, node.input.value))    //dispatch派发的是一个函数
    },
    handleDeleteCategory(userId, currentIndex, menuContent) {
      const menuItem = menuContent[currentIndex].articleCategoryName
      const articleCategoryId = menuContent[currentIndex].articleCategoryId
      confirm({
        title: '你确定删除下面分类吗？',
        icon: <ExclamationCircleOutlined />,
        content: [ menuItem ],
        okText: '确认',
        cancelText: '取消',
        onOk() {
          dispatch(actionCreators.deleteCategory(userId, articleCategoryId))
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AntMenu);
