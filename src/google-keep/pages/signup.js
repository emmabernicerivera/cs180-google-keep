import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import styled from 'styled-components';

import { AppWithAuthentication } from '../src/components/App';
import { auth, db } from '../src/firebase';
import * as routes from '../src/constants/routes';
import Title from '../src/components/Styled/Title';
import Submit from '../src/components/Styled/Submit';
import Input from '../src/components/Styled/Input';
import Container from '../src/components/Styled/Container';

const SignUpPage = () => (
  <AppWithAuthentication>
    <Container>
      <Title>Sign Up</Title>
      <SignUpForm />
    </Container>
  </AppWithAuthentication>
);

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            Router.push(routes.HOME);
          })
          .catch(error => {
            this.setState(updateByPropertyName('error', error));
          });
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '' || username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <Input
          value={username}
          onChange={event =>
            this.setState(updateByPropertyName('username', event.target.value))
          }
          type="text"
          placeholder="Full Name"
        />
        <Input
          value={email}
          onChange={event =>
            this.setState(updateByPropertyName('email', event.target.value))
          }
          type="text"
          placeholder="Email Address"
        />
        <Input
          value={passwordOne}
          onChange={event =>
            this.setState(
              updateByPropertyName('passwordOne', event.target.value)
            )
          }
          type="password"
          placeholder="Password"
        />
        <Input
          value={passwordTwo}
          onChange={event =>
            this.setState(
              updateByPropertyName('passwordTwo', event.target.value)
            )
          }
          type="password"
          placeholder="Confirm Password"
        />
        <Submit disabled={isInvalid} type="submit">
          Sign Up
        </Submit>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account?{' '}
    <Link href={routes.SIGN_UP}>
      <a>Sign Up</a>
    </Link>
  </p>
);
export default SignUpPage;
export { SignUpForm, SignUpLink };
