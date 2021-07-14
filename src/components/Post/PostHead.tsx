import styled from '@emotion/styled';
import Img, { FluidObject } from 'gatsby-image';
import React, { FC } from 'react';

type GatsbyImgProps = {
  fluid: FluidObject;
  alt: string;
  className?: string;
};

export interface PostHeadProps {
  thumbnail: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

const PostHeadWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
`;

const BackgroundImage = styled((props: GatsbyImgProps) => (
  <Img {...props} style={{ position: 'absolute' }} />
))`
  z-index: -1;
  width: 100%;
  height: 400px;
  object-fit: cover;
  filter: brightness(0.25);
`;

const PostHead: FC<PostHeadProps> = ({
  thumbnail: {
    childImageSharp: { fluid },
  },
}) => {
  return (
    <PostHeadWrapper>
      <BackgroundImage fluid={fluid} alt="thumbnail" />
    </PostHeadWrapper>
  );
};

export default PostHead;
