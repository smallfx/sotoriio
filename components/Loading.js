import styled from 'styled-components';

const LoadContainer = styled.div`
  margin-top: 40px;
`;

export const Loading = ({ user, works, work }) => {
  if (user) {
    return <LoadContainer>Loading user...</LoadContainer>
  }
  if (works) {
    return <LoadContainer>Loading works...</LoadContainer>
  }
  if (work) {
    return <LoadContainer>Loading work...</LoadContainer>
  }

  return <LoadContainer>Loading...</LoadContainer>
};

export default Loading;
