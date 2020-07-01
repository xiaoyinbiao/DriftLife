import styled from 'styled-components';

export const PageWrapper = styled.div`
	margin: 0 auto;
	padding: 0 50px;
	padding-top: 30px;
	clear: both;
`;
export const PageLeft = styled.div`
  float: left;
  width: 250px;
  height: 100%;
`

export const PageRight = styled.div`
	width: 250px;
	float: right;
`;

export const PageCenter = styled.div`
	padding: 0 300px;
	.banner-img {
		width: 625px;
		height: 270px;
	}
	.toolStyle {
	  margin-top: 10px;
	  border: 1px solid #ccc;
	}
	.editStyle {
	  height: 500px;
	  border: 1px solid #ccc;
	}
	.submitBtn {
	  margin-top: 10px;
	  margin-left: 370px;
	}
`;

