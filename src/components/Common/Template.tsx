import styled from '@emotion/styled';
import React, { FC } from 'react';
import Footer from './Footer';
import GlobalStyle from './GlobalStyle';

interface TemplateProps {
  children: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Template: FC<TemplateProps> = ({ children }) => {
  return (
    <Container>
      <GlobalStyle />
      {children}
      <Footer />
    </Container>
  );
};

export default Template;
