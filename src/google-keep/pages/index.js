import React from 'react';
import styled from 'styled-components';

import { AppWithAuthentication } from '../src/components/App';
import Title from '../src/components/Styled/Title';

const Container = styled.div`
	background-image: url('../static/background.jpg');
	background-size: 1278px;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	& > * {
		color: white;
	}
`;

//add cloud component ??

const LandingPage = () => (
	<AppWithAuthentication>
		<Container>
			<Title>Google Keep</Title>
			<p>Welcome!</p>
		</Container>
	</AppWithAuthentication>
);
export default LandingPage;
