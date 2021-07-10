import styled from '@emotion/styled';
import Footer from 'components/Common/Footer';
import GlobalStyle from 'components/Common/GlobalStyle';
import CategoryList from 'components/Main/CategoryList';
import Introduction from 'components/Main/INtroduction';
import PostList from 'components/Main/PostList';
import React, { FC } from 'react';

const CATEGORY_LIST = {
  All: 5,
  Web: 3,
  Mobile: 2,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const IndexPage: FC = () => {
  return (
    <Container>
      <GlobalStyle />
      <Introduction />
      <CategoryList selectedCategory={'Web'} categoryList={CATEGORY_LIST} />
      <PostList />
      <Footer />
    </Container>
  );
};

export default IndexPage;
