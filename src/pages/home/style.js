import styled from 'styled-components';
import * as menuColor from '../../statics/cssVariable/colorVariable'

export const HomeWrapper = styled.div`
	margin: 0 auto;
	padding: 0 50px;
	padding-top: 30px;
	clear: both;
`;

export const HomeLeft = styled.div`
  float: left;
  width: 250px;
  height: 100%;
`

export const HomeRight = styled.div`
	width: 250px;
	float: right;
`;

export const HomeCenter = styled.div`
	padding: 0 300px;
	.banner-img {
		width: 625px;
		height: 270px;
	}
`;

export const TopicWrapper = styled.div`
	overflow: hidden;
	padding: 20px 0 10px 0;
	margin-left: -18px;
	border-bottom: 1px solid #dcdcdc;
`;

export const TopicItem = styled.div`
	float: left;
	height: 32px;
	line-height: 32px;
	margin-left: 18px;
	margin-bottom: 18px;
	padding-right: 10px
	background: #f7f7f7;
	font-size: 14px;
	color: #000;
	border: 1px solid #dcdcdc;
	border-radius: 4px;
	.topic-pic {
		display: block;
		float: left;
		width: 32px;
		height: 32px;
		margin-right: 10px;
	}
`;

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

export const RecommendWrapper = styled.div`
	margin: 30px 0;
	width: 280px;
`;

export const RecommendItem = styled.div`
	width: 280px;
	height: 50px;
	background: url(${(props) => props.imgUrl});
	background-size: contain;
`;

export const WriterWrapper = styled.div`
	width: 250px;
	border: 1px solid #dcdcdc;
	border-radius: 3px;
	height: 300px;
	text-align: center;
`;
export const WriterSentence = styled.div`
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
`
export const WriterContent = styled.div`
  text-align: left;
`
export const WriterSource = styled.div`
  text-align: right;
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

export const Page = styled.div`
	width: 100%;
	height: 40px;
	line-height: 40px;
	margin: 30px 0;
	text-align:center;
`;

export const BackTop = styled.div`
	position: fixed;
	right: 100px;
	bottom: 100px;
	width: 60px;
	height: 60px;
	line-height: 60px;
	text-align: center;
	border: 1px solid #ccc;
	font-size: 14px;
`
export const MenuWrapper = styled.div`
  width: 250px;
  height: 500px;
  overflow: auto;
  border-radius: 5px;
  background-image: linear-gradient(#f4f4f4, white);
`
export const MenuUl = styled.ul`
    .active {
    background-color: ${menuColor.bgcolor};
    color:white;
  }
`
export const MenuLi = styled.li`
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #969696;
  cursor: pointer;
  :hover {
    background-color: ${menuColor.bgcolor};
    color:white;
  }
`
export const MenuHeader = styled.li`
  height: 40px;
  line-height: 40px;
  letter-spacing: 5px;
  text-align: center;
  font-weight: bold;
  background-color: ${menuColor.menuheadercolor};
`
export const MenuBottom = styled.div`
  text-align: center;
  .MenuBottom {
    color: ${menuColor.bgcolor};
    border: 1px solid ${menuColor.bgcolor};
    :hover {
      color: white;
      background-color: ${menuColor.bgcolor};
    }
    :focus {
      color: ${menuColor.bgcolor};
      border: 1px solid ${menuColor.bgcolor};
    }
    :first-child {
      margin-right: 10px;
    }
  }
`
export const SearchWrapper = styled.div``
