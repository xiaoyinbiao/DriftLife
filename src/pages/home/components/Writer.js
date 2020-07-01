import React, { PureComponent } from 'react';
import { WriterWrapper, WriterSentence, WriterContent, WriterSource } from '../style';
import {connect} from "react-redux";
import { actionCreators } from '../store';

class Writer extends PureComponent {

	render() {
		const { sentenceContent, sentenceSource } = this.props
		return (
			<WriterWrapper>
				<iframe name="weather_inc" src="http://i.tianqi.com/index.php?c=code&id=2&num=1" width="220" height="70"
								frameBorder="0" marginWidth="0" marginHeight="0" scrolling="no"></iframe>
				<WriterSentence>每日美句</WriterSentence>
				<WriterContent>
					{sentenceContent} <br/>
				</WriterContent>
				<WriterSource>
					----{sentenceSource}
				</WriterSource>
			</WriterWrapper>
		)
	}
	componentDidMount() {
		this.props.getSentence()
	}
}

const mapStateToProps = (state) => ({
	sentenceContent: state.getIn(['home','sentenceContent']),
	sentenceSource: state.getIn(['home','sentenceSource'])
})

const mapDispatchToProps = (dispatch) => ({
	getSentence() {
		dispatch(actionCreators.getSentence())
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Writer);
