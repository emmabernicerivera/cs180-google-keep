import React from 'react';
import styled from 'styled-components';

import { askForPermissionToReceiveNotifications } from '../src/services/push-notifications';

import { AppWithAuthentication } from '../src/components/App';
import Title from '../src/components/Styled/Title';
import Container from '../src/components/Styled/Container';

const LandingPage = () => (
	<AppWithAuthentication>
		<Container>
			<Title>Google Keep</Title>
			<p>Welcome!</p>
		</Container>
	</AppWithAuthentication>
);
export default LandingPage;
