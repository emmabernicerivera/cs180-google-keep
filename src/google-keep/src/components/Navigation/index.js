import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

import * as routes from '../../constants/routes';
import SignOutButton from '../SignOut';

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
  <ul>
    <p>
      <Link href={routes.LANDING}>
        <a>Landing</a>
      </Link>
    </p>
    <p>
      <Link href={routes.HOME}>
        <a>Home</a>
      </Link>
    </p>
    <p>
      <Link href={routes.ACCOUNT}>
        <a>Account</a>
      </Link>
    </p>
    <SignOutButton />
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <p>
      <Link href={routes.LANDING}>
        <a>Landing</a>
      </Link>
    </p>
    <p>
      <Link href={routes.SIGN_IN}>
        <a>Sign In</a>
      </Link>
    </p>
  </ul>
);

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
