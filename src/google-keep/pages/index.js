import React from 'react';

import { AppWithAuthentication } from '../src/components/App';
import Title from '../src/components/Styled/Title';

const LandingPage = () => (
	<AppWithAuthentication>
		<Title>Google Keep</Title>
		<p>Welcome!</p>
	</AppWithAuthentication>
);
export default LandingPage;
