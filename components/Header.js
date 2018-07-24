import React from 'react';
import { Link } from '../routes';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  height: 50px;
	line-height: 50px;
	letter-spacing: 2px;
	background: black;
	color: white;
	text-align: center;
	font-size: 20px;
	font-weight: 600;

	a { text-decoration: none; color: white; }
`;

export const Header = props => (
  <HeaderContainer>
		<Link route='/'>
			<a>sotoriio</a>
		</Link>
  </HeaderContainer>
);

export default Header;
