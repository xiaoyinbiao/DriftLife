import styled from 'styled-components';
import bgPic from '../../statics/bgpic.jpg'

export const RegisterWrapper = styled.div`
	z-index: 0;
	position: absolute;
	left: 0;
	right: 0;
	bottom: 0;
	top: 56px;
	background: url(${bgPic}) no-repeat;
	background-size: 100% 100%;
`;

export const RegisterBox = styled.div`
  position: relative;
  z-index: -100;
	width: 400px;
	height: 300px;
	margin: 100px auto;
	padding-top: 20px;
	background-color: rgba(255,255,255,0.6);
	box-shadow: 0 0 8px rgba(0,0,0,.1);
`;
