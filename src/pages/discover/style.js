import styled from 'styled-components';

export const ListItem = styled.div`
	overflow: hidden;
	padding: 10px 0;
	border-bottom: 1px solid #dcdcdc;
	.pic {
		display: block;
		width: 125px;
		height: 100px;
		float: right;
		border-radius: 10px;
	}
`;

export const ListInfo =	styled.div`
	width: 100%;
	.title {
		line-height: 27px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}
	.desc {
	  width: 100%;
	  height: 50px;
	  line-height: 16px;
		font-size: 13px;
		text-overflow: ellipsis;
		overflow: hidden;
		color: #999;
		img {
		  width: 100px;
		  height: 50px;
		  float: left;
		  margin-right: 5px;
		  border-radius: 3px;
		}
	}
`;

export const ListBottom = styled.div`
  .positive {
    color: red;
  }
  .negative {
    color: #999;
    margin-left: 30px;
  }
  .tag {
    margin-left: 30px;
  }
`

export const LoadMore = styled.div`
	width: 100%;
	height: 40px;
	line-height: 40px;
	margin: 30px 0;
	background: #a5a5a5;
	text-align:center;
	border-radius: 20px;
	color: #fff;
	cursor: pointer;
`;

