import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingMessage from '../components/LoadingMessage';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      nameInput: '',
      loading: false,
    };
  }

  controlInputName = ({ target }) => {
    this.setState({ nameInput: target.value });
  }

  handleLoginButton = async () => {
    const { logIn } = this.props;
    const { nameInput } = this.state;
    this.setState({ loading: true });
    await createUser({ name: nameInput });
    logIn();
  }

  render() {
    const { nameInput, loading } = this.state;
    const minLenghtUsername = 3;
    return (
      <div data-testid="page-login">
        <input
          data-testid="login-name-input"
          value={ nameInput }
          onChange={ this.controlInputName }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          // remember that if true, it will be DISABLED. !-false means the button is clickable-!
          disabled={ nameInput.length < minLenghtUsername }
          onClick={ this.handleLoginButton }
        >
          Entrar

        </button>
        {loading ? <LoadingMessage /> : null}
      </div>
    );
  }
}

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
};
