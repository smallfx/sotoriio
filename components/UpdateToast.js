import React from 'react';
import styled from 'styled-components';

const UpdateToastContainer = styled.div`
  position: absolute;
  width: 100% !important;
  background: ${props => Boolean(props.updating) ? 'blue' : 'green'};
  height: ${props => Boolean(props.updating) ? '30px' : '0'};
  line-height: 30px;
  text-align: center;
  font-size: 12px;
  color: white;
  overflow: hidden;
  transition: height 0.2s linear 0.3s, background-color 0.3s; 
`;

export const UpdateToast = props => (
  <UpdateToastContainer updating={ props.updating }>
    { props.updating ? 'Updating...' : 'Updated!' }
  </UpdateToastContainer>
);

export default UpdateToast;
