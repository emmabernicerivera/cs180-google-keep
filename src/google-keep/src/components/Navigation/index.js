import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as routes from '../../constants/routes';
import SignOutButton from '../SignOut';

const List = styled.ul`
  position: fixed;
  z-index: 10;
  top: 18px;
  right: 0px;
  height: 38px;

  list-style-type: none;
  float: right;

  & > li {
    display: inline;
    margin: 20px;
    font-size: 20px;
    font-weight: bold;

    & > a {
      color: ${({ theme }) => theme.grey};
      text-decoration: none;

      &:hover {
        border-bottom: 2px solid black;
      }
    }
  }
`;

const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
  <List>
    <li>
      <Link href={routes.LANDING}>
        <a>Landing</a>
      </Link>
    </li>
    <li>
      <Link href={routes.HOME}>
        <a>Home</a>
      </Link>
    </li>
    <li>
      <Link href={routes.ACCOUNT}>
        <a>Account</a>
      </Link>
    </li>
    <SignOutButton />
  </List>
);

const NavigationNonAuth = () => (
  <List>
    <li>
      <Link href={routes.LANDING}>
        <a>Landing</a>
      </Link>
    </li>
    <li>
      <Link href={routes.SIGN_IN}>
        <a>Sign In</a>
      </Link>
    </li>
  </List>
);

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
