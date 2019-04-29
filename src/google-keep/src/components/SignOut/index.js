import React from 'react';
import styled from 'styled-components';

import { auth } from '../../firebase';
import Submit from '../Styled/Submit';

const SignOut = styled(Submit)`
	display: inline;
	width: auto;
	margin-right: 20px;
`;

const SignOutButton = () => (
	<SignOut type="button" onClick={auth.doSignOut}>
		Sign Out
	</SignOut>
);

export default SignOutButton;
