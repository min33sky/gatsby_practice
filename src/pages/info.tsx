import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import { graphql, Link } from 'gatsby';
import React, { FC } from 'react';

const globalStyle = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-size: 20px;
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: gray;
`;

const Description = styled.div<{ disabled: boolean }>`
  font-size: 20px;
  font-weight: 700;
  text-decoration: ${({ disabled }) => (disabled ? `line-through` : `none`)};
`;

const Author = styled.div<{ disabled: boolean }>`
  font-size: 15px;
  color: blue;
  text-decoration: ${({ disabled }) => (disabled ? `line-through` : `none`)};
`;

interface IProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
        author: string;
      };
    };
  };
}

const InfoPage: FC<IProps> = ({
  data: {
    site: {
      siteMetadata: { author, description, title },
    },
  },
}) => {
  return (
    <div>
      <Global styles={globalStyle} />
      <Title>{title}</Title>
      <Description disabled>{description}</Description>
      <Author disabled>{author}</Author>
    </div>
  );
};

export default InfoPage;

export const metadataQuery = graphql`
  {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;
