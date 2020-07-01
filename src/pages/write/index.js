import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { PageWrapper, PageCenter, PageRight } from "../../initStyle";
import Writer from '../home/components/Writer';
import { Select, message } from "antd";
import E from 'wangeditor';
import { Button, Input } from 'antd';
import { ArticleTitle } from "./style";
import { actionCreators } from './store';

class Write extends PureComponent {
	render() {
		const { userId, loginStatus, articleCategory, articleContent ,editorCategoryId, saveArticle, handleSelect } = this.props;
		const { Option } = Select
		if (loginStatus) {   //1是测试下用
			return (
					<PageWrapper>
						<PageRight>
							<Writer />
						</PageRight>
						<PageCenter>
							<span>文章分类：</span>
							<Select placeholder='请选择文章分类'
											style={{ width: 320 }}
											onChange={ handleSelect }
											allowClear
							>
								{
										articleCategory.map((item) => {
											return (
													<Option
															key={item.articleCategoryId}
															value={item.articleCategoryId}
															data-optionid={item.articleCategoryId}
													>
														{item.articleCategoryName}
													</Option>
											)
									})
								}
							</Select>
							<ArticleTitle>
								<span>文章主题：</span><Input placeholder="请输入文章主题" style={{width: '320px'}} ref={(input) => {this.articleTitle = input}} />
							</ArticleTitle>
							<div ref='editorTool' className='toolStyle'></div>
							<div ref='editorElem' className='editStyle'>
								<span>在这里编辑您的内容</span>
							</div>
							<Button className='submitBtn' onClick={ () => saveArticle(userId, editorCategoryId,this.articleTitle,articleContent) }>保存文章</Button>
						</PageCenter>
					</PageWrapper>
			)
		}else {
			return <Redirect to='/login'/>
		}
	}

	componentDidMount() {
		if(this.props.loginStatus) {
			const editorTool = this.refs.editorTool;
			const elem = this.refs.editorElem;
			const editor = new E(editorTool, elem)
			// 使用 onchange 函数监听内容的变化，并实时更新到 state 中
			editor.customConfig.onchange = html => {
				this.props.changeEditContent(html)
			}
			editor.customConfig.zIndex = 0;
			editor.customConfig.menus = [
				'bold',  // 粗体
				'fontSize',  // 字号
				'fontName',  // 字体
				'italic',  // 斜体
				'underline',  // 下划线
				'strikeThrough',  // 删除线
				'foreColor',  // 文字颜色
				'backColor',  // 背景颜色
				'link',  // 插入链接
				'list',  // 列表
				'justify',  // 对齐方式
				'quote',  // 引用
				'emoticon',  // 表情
				'image',  // 插入图片
				'table',  // 表格
				'video',  // 插入视频
				'code',  // 插入代码
				'undo',  // 撤销
				'redo'  // 重复
			];
			//editor.customConfig.uploadImgServer = '/driftlife_war/upload';    //地址要记得改啊，linux地址
			editor.customConfig.uploadImgServer = '/upload';
			editor.customConfig.debug = window.location.href.indexOf('wangeditor_debug_mode=1') > 0
			editor.customConfig.uploadImgMaxLength = 1;
			editor.customConfig.uploadFileName = 'picFile';
			editor.customConfig.uploadImgHooks = {
				customInsert: function (insertImg, result, editor) {
					let url = result.url
					if(url) {
						insertImg(url)
					} else {
						alert("添加图片失败！");
					}
				}
			};
			editor.create()
		} else {
			message.info('请先登陆');
		}
	}
}

const mapState = (state) => ({
	userId: state.getIn(['login','userId']),
	loginStatus: state.getIn(['login', 'login']),
	articleCategory: state.getIn(['home','menuContent']),
	articleContent: state.getIn(['writer','editorContent']),
	editorCategoryId: state.getIn(['writer','editorCategory'])
})

const mapDispatch = (dispatch) => ({
	changeEditContent(html) {
		console.log(html)
		dispatch(actionCreators.changeEditContent(html))
	},
	handleSelect(key, value) {
		console.log(key,value)
		let id
		if (value) {
			id = parseInt(value.key)
		} else {
			id = null
		}
		dispatch(actionCreators.changeArticleCategoryId(id))
	},
	saveArticle(userId, categoryId, title, content) {
		let titleValue = title.input.value
		if (!categoryId) {
			message.info('请选择文章分类')
			return
		}
		if (!titleValue) {
			message.info('请输入文章主题')
			return
		}
		if (!content) {
			message.info('请输入文章内容')
			return
		}
		dispatch(actionCreators.saveArticle(userId, categoryId, titleValue, content));
	}
})

export default connect(mapState, mapDispatch)(Write);
