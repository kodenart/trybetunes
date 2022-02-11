import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import LoadingMessage from './LoadingMessage';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userName: '',
    };
  }

  componentDidMount() {
    this.setUserName();
  }

  setUserName = async () => {
    this.setState({ loading: true });
    const nameGetted = await getUser();
    this.setState({
      userName: nameGetted.name,
      loading: false,
    });
  }

  render() {
    const { loading, userName } = this.state;
    return (
      <div data-testid="header-component">
        {loading && <LoadingMessage />}
        <p data-testid="header-user-name">
          {userName}
        </p>
      </div>
    );
  }
}
