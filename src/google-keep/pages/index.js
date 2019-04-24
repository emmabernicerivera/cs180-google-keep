import React from 'react';

import { AppWithAuthentication } from '../src/components/App';
import Title from '../src/components/Styles/Title';

const LandingPage = () => (
	<AppWithAuthentication>
		<Title>Google Keep</Title>
		<p>Welcome!</p>
	</AppWithAuthentication>
);
export default LandingPage;
