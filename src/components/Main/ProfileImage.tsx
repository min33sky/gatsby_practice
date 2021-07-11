import styled from '@emotion/styled';
import { FluidObject } from 'gatsby-image';
import React from 'react';
import { FC } from 'react';
import Img from 'gatsby-image';

// const PROFILE_IMAGE_LINK = `https://picjumbo.com/wp-content/uploads/the-golden-gate-bridge-sunset-2210x1473.jpg`;

const ProfileImageWrapper = styled(Img)`
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

export interface ProfileImageProps {
  profileImage: FluidObject;
}

const ProfileImage: FC<ProfileImageProps> = ({ profileImage }) => {
  return <ProfileImageWrapper fluid={profileImage} alt="Profile Image" />;
};

export default ProfileImage;
