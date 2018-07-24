import React from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  margin: 40px 0;
  display: flex;

  @media (max-width: 649px) {
    display: grid;
    grid-columns-template: 1fr 1fr;
    margin: 20px 0;
  }
`;

const ProfileImage = styled.div`
  height: 100px;
  width: 100px;
  flex-shrink: 0;
  background: gray;
  margin-right: 20px;
  border-radius: 3px;
  overflow: hidden;

  img { height: 100%; }
`;

const InfoContainer = styled.div`
  flex-grow: 0;
  flex-shrink: 1;
  border-right: 1px solid lightgray; 
  margin: 10px 0;
  padding: 5px 20px 5px 0;

  h2 {
    font-weight: bold;
    margin-bottom: 7px;
  }

  span {
    font-size: 12px;
    line-height: 1.8em;
    display: block;
  }

  @media (max-width: 649px) {
    border-right: none;
    border-bottom: 1px solid lightgray;
    padding: 0 0 20px;
    margin: 20px 0 0;
  }
`;

const BioContainer = styled.div`
  flex: 1;
  margin: 10px 0;
  font-size: 14px;
  white-space: pre-line;
  line-height: 1.6em;
  margin: 10px 0;
  padding: 5px 20px 5px 20px;

  p {
    max-width: 400px;
    font-size: 12px;
  }

  @media (max-width: 649px) {
    padding: 0;
    margin-top: 20px;
    margin-bottom: 0;
  }
`;

export const Profile = props => (
  <ProfileContainer>
    { props.user.avatar &&
      <ProfileImage>
        <img src={ props.user.avatar.small } />
      </ProfileImage>
    }
    <InfoContainer>
      <h2>{ props.user.name }</h2>
      <span>{ props.user.location }</span>
      <span>{ props.user.profession }</span>
    </InfoContainer>
    <BioContainer>
      <p>{ props.user.bio }</p>
    </BioContainer>
  </ProfileContainer>
);

export default Profile;
