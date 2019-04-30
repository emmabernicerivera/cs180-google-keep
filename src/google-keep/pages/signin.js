import React, { Component } from 'react';
import Router from 'next/router';
import styled from 'styled-components';

import { SignUpLink } from './signup';
import { PasswordForgetLink } from './pw-forget';
import { AppWithAuthentication } from '../src/components/App';
import { auth } from '../src/firebase';
import * as routes from '../src/constants/routes';
import Title from '../src/components/Styled/Title';
import Input from '../src/components/Styled/Input';
import Submit from '../src/components/Styled/Submit';
import Container from '../src/components/Styled/Container';

const SignInPage = () => (
  <AppWithAuthentication>
    <Container>
      <Title>Sign In</Title>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </Container>
  </AppWithAuthentication>
);

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        Router.push(routes.HOME);
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <Input
          value={email}
          onChange={event =>
            this.setState(updateByPropertyName('email', event.target.value))
          }
          type="text"
          placeholder="Email Address"
        />
        <Input
          value={password}
          onChange={event =>
            this.setState(updateByPropertyName('password', event.target.value))
          }
          type="password"
          placeholder="Password"
        />
        <Submit disabled={isInvalid} type="submit">
          Sign In
        </Submit>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default SignInPage;

export { SignInForm };
