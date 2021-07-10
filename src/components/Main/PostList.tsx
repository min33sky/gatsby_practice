import styled from '@emotion/styled';
import React, { FC } from 'react';
import PostItem from './PostItem';

const POST_ITEM_DATA = {
  title: 'Post Item Title',
  date: '2020.01.29',
  categories: ['Web', 'Frontend', 'Testing'],
  summary: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem excepturi doloribus voluptate molestias cupiditate? Ex officiis tempore facilis rem quam.`,
  thumbnail: `https://ji5485.github.io/static/e4f34c558ae8e8235ff53b0311085796/4d854/javascript-core-concept-summary-function-1.webp`,
  link: 'https://www.google.com',
};

const PostListWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  width: 768px;
  margin: 0 auto;
  padding: 50px 0 100px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
    padding: 50px 20px;
  }
`;

const PostList: FC = () => {
  return (
    <PostListWrapper>
      <PostItem {...POST_ITEM_DATA} />
      <PostItem {...POST_ITEM_DATA} />
      <PostItem {...POST_ITEM_DATA} />
      <PostItem {...POST_ITEM_DATA} />
    </PostListWrapper>
  );
};

export default PostList;
