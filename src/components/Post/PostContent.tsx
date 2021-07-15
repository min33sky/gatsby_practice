import styled from '@emotion/styled';
import React, { FC } from 'react';

interface PostContentProps {
  html: string;
}

const MarkdownRenderer = styled.div`
  /* Renderer Style */
  display: flex;
  flex-direction: column;
  width: 768px;
  margin: 0 auto;
  padding: 100px 0;
`;

const PostContent: FC<PostContentProps> = ({ html }) => {
  return <MarkdownRenderer dangerouslySetInnerHTML={{ __html: html }} />;
};

export default PostContent;
