import styled from 'styled-components';

export const Header = styled.div`
	margin: 50px 0 20px 0;
	line-height: 44px;
	font-size: 34px;
	color: #333;
	font-weight: bold;
`;

export const Content = styled.div`
  width: 100%;
  word-break: break-all;
	color: ##2f2f2f;
	box-shadow: 2px 2px 5px #888888;
	p {
		margin: 25px 0;
		font-size: 16px;
		line-height: 30px;
	}
	b {
		font-weight: bold;
	}
	/* table 样式 */
  table {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }
  table td,
  table th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
  }
  table th {
    border-bottom: 2px solid #ccc;
    text-align: center;
  }
  
  /* blockquote 样式 */
  blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    font-size: 100%;
    background-color: #f1f1f1;
  }
  
  /* code 样式 */
  code {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    background-color: #f1f1f1;
    border-radius: 3px;
    padding: 3px 5px;
    margin: 0 3px;
  }
  pre code {
    display: block;
  }
  
  /* ul ol 样式 */
  ul, ol {
    margin: 10px 0 10px 20px;
  }
`;

export const ArticleAuthor = styled.div`
  margin: 10px auto;
  padding-bottom: 20px;
  border-bottom: 1px solid #656B79;
  font-size: 12px;
  color: #999;
  .item {
    padding-left: 10px;
  }
  .publish {
    margin-left: 10px;
  }
`
export const DetailWrapper = styled.div`
	margin: 0 auto;
	padding: 0 50px;
	clear: both;
`;

export const PageFooter = styled.div`
  height: 25px;
  line-height: 25px;
  .footerLeft {
    float: left;
    width: 252px;
    margin-top: 10px;
    border-bottom: 1px solid black;
  }
  .footerRight {
    float: right;
    width: 252px;
    margin-top: 10px;
    border-bottom: 1px solid black;
  }
  .footerCenter {
    padding: 0 300px;
    text-align: center;
    .likeFill {
      margin-right: 20px;
    }
    .tag {
      margin-left: 20px;
      color: blue;
    }
  }
`

export const CommentWrapper = styled.div``
