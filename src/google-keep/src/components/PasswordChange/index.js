import React, { Component } from 'react';

import { auth } from '../../firebase';
import Input from '../Styled/Input';
import Submit from '../Styled/Submit';

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    auth
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  };

  render() {
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    return (
      <form onSubmit={this.onSubmit}>
        <Input
          value={passwordOne}
          onChange={event =>
            this.setState(
              updateByPropertyName('passwordOne', event.target.value)
            )
          }
          type="password"
          placeholder="New Password"
        />
        <Input
          value={passwordTwo}
          onChange={event =>
            this.setState(
              updateByPropertyName('passwordTwo', event.target.value)
            )
          }
          type="password"
          placeholder="Confirm New Password"
        />
        <Submit disabled={isInvalid} type="submit">
          Reset My Password
        </Submit>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default PasswordChangeForm;
