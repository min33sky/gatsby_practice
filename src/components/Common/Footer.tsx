import styled from '@emotion/styled';
import React from 'react';
import { FC } from 'react';

const FooterWrapper = styled.div`
  display: grid;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 15px;
  text-align: center;
  line-height: 1.5;
`;

const Footer: FC = () => {
  return (
    <FooterWrapper>
      Thank You for Visiting My BLog, Have a Good Day
      <br />
      Powered By Gatsby.
    </FooterWrapper>
  );
};

export default Footer;
