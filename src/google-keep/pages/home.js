import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AppWithAuthorization } from '../src/components/App';
import { db } from '../src/firebase';
import Note, { Notes, Notebox } from '../src/components/NewNote';
import styled from 'styled-components';

const fromObjectToList = object =>
  object
    ? Object.keys(object).map(key => ({ ...object[key], index: key }))
    : [];

class HomePage extends Component {
  componentDidMount() {
    const { onSetUsers } = this.props;

    db.onceGetUsers().then(snapshot =>
      onSetUsers(fromObjectToList(snapshot.val()))
    );
  }

  render() {
    const { authUser } = this.props;

    if (authUser == null) {
      return null;
    }

    return (
      <AppWithAuthorization>
        <h1>Home</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <Notes uid={authUser.uid} />
      </AppWithAuthorization>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
});

const mapDispatchToProps = dispatch => ({
  onSetUsers: users => dispatch({ type: 'USERS_SET', users }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
