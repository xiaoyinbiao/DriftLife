import React, { PureComponent } from 'react';
import { PageWrapper, PageCenter, PageRight } from "../../initStyle";
import Writer from '../home/components/Writer';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import {Link} from "react-router-dom";
import {ListBottom, ListInfo, ListItem, LoadMore} from "./style";
import {Tag} from "antd";
import { LikeFilled, DislikeFilled } from '@ant-design/icons';

class Discover extends PureComponent {
  render() {
    const { list, discoverArticlePage, getMoreList } = this.props;
    return(
        <PageWrapper>
          <PageRight>
            <Writer />
          </PageRight>
          <PageCenter>
            {
              list.map((item, index) => {
                return (
                    <Link key={index} to={'/detail/' + item.articleId}>
                      <ListItem >
                        <ListInfo>
                          <h3 className='title'>{item.articleTitle}</h3>
                          <p className='desc'
                             dangerouslySetInnerHTML={{__html: item.articleContent}}
                          />
                        </ListInfo>
                        <ListBottom>
                          <LikeFilled className='positive'/> {item.articlePositive}
                          <DislikeFilled className='negative' /> {item.articleNegative}
                        </ListBottom>
                      </ListItem>
                    </Link>
                );
              })
            }
            <LoadMore onClick={() => getMoreList(discoverArticlePage)}>换一换</LoadMore>
          </PageCenter>
        </PageWrapper>
    )
  }
  componentDidMount() {
    this.props.getDiscoverArticleList(this.props.discoverArticlePage)
  }
}

const mapState = (state) => ({
  list: state.getIn(['discover','discoverArticleList']),
  discoverArticlePage: state.getIn(['discover','discoverArticlePage'])
})
const mapDispatch = (dispatch) => ({
  getDiscoverArticleList(page) {
    dispatch(actionCreators.getDiscoverArticleList(page))
  },
  getMoreList(discoverArticlePage) {
    dispatch(actionCreators.getMoreList(discoverArticlePage))
  }
})

export default connect(mapState,mapDispatch)(Discover);
