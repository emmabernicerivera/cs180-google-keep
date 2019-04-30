import React, { Component } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { AppWithAuthentication } from '../src/components/App';
import * as routes from '../src/constants/routes';
import { auth } from '../src/firebase';
import Input from '../src/components/Styled/Input';
import Submit from '../src/components/Styled/Submit';
import Container from '../src/components/Styled/Container';

const ForgetSubmit = styled(Submit)`
  margin-bottom: 10px;
`;

const PasswordForgetPage = () => (
  <AppWithAuthentication>
    <Container>
      <h1>Password Forget Form</h1>
      <PasswordForgetForm />
    </Container>
  </AppWithAuthentication>
);

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    auth
      .doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <Input
          value={this.state.email}
          onChange={event =>
            this.setState(updateByPropertyName('email', event.target.value))
          }
          type="text"
          placeholder="Email Address"
        />
        <ForgetSubmit disabled={isInvalid} type="submit">
          Reset My Password
        </ForgetSubmit>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link href={routes.PASSWORD_FORGET}>
      <a>Forgot Password?</a>
    </Link>
  </p>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };
