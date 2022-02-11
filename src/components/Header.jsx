import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
        <div className="navLinks">
          <Link data-testid="link-to-search" to="/search"> Search </Link>
          <Link data-testid="link-to-favorites" to="/favorites"> Favorites </Link>
          <Link data-testid="link-to-profile" to="/profile"> Profile </Link>
        </div>
        {loading && <LoadingMessage />}
        <p data-testid="header-user-name">
          {userName}
        </p>
      </div>
    );
  }
}
