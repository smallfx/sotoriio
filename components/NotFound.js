import styled from 'styled-components';

const NotFoundContainer = styled.div`
  margin-top: 40px;
`;

export const NotFound = ({ user, works, work }) => {
  if (user) {
    return <NotFoundContainer>This user could not be found.</NotFoundContainer>
  }
  if (works) {
    return <NotFoundContainer>No works found.</NotFoundContainer>
  }
  if (work) {
    return <NotFoundContainer>This work could not be found.</NotFoundContainer>
  }

  return <NotFoundContainer>Not found.</NotFoundContainer>
};

export default NotFound;
