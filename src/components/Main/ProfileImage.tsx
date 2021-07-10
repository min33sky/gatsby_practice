import styled from '@emotion/styled';
import React from 'react';
import { FC } from 'react';

const PROFILE_IMAGE_LINK = `https://picjumbo.com/wp-content/uploads/the-golden-gate-bridge-sunset-2210x1473.jpg`;

const ProfileImageWrapper = styled.img`
  width: 120px;
  height: 120px;
  margin-bottom: 30px;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const ProfileImage: FC = () => {
  return <ProfileImageWrapper src={PROFILE_IMAGE_LINK} alt="Profile Image" />;
};

export default ProfileImage;
