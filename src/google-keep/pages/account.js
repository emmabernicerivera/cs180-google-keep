import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { PasswordForgetForm } from './pw-forget';
import { AppWithAuthorization } from '../src/components/App';
import PasswordChangeForm from '../src/components/PasswordChange';
import Input from '../src/components/Styled/Input';

const Container = styled.div`
	display: flex;

	& > * {
		margin: 20px;
	}
`;

const AccountPage = ({ authUser }) => (
	<AppWithAuthorization>
		<h1>Account: {authUser.email}</h1>
		<Container>
			<PasswordForgetForm />
			<PasswordChangeForm />
		</Container>
	</AppWithAuthorization>
);

const mapStateToProps = state => ({
	authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(AccountPage);
