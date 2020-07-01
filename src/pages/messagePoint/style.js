import styled from 'styled-components';

export const ListWrapper = styled.div`
  padding: 10px 0;
  width: 100%;
  height: 120px;
  background-color: white;
  border-top: 2px solid #F5F5F5;
`
export const ListItemHeader = styled.div`
  height: 20px;
  font-size: 12px;
`
export const ListItemContent = styled.div`
  height: 20px;
  line-height: 20px;
  overflow: hidden;
`
export const ListItemArticle = styled.div`
  height: 60px;
  width: 100%;
  display: table;
  font-weight: bold;
  background-color: #F5F5F5;
  .article-title {
    vertical-align: middle;
    display: table-cell;
  }
`
