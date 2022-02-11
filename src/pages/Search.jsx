import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
    };
  }

  updateSI = ({ target }) => {
    this.setState({ searchInput: target.value });
  }

  render() {
    const { searchInput } = this.state;
    const arbValueBtn = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          value={ searchInput }
          onChange={ this.updateSI }
          data-testid="search-artist-input"
        />
        <button
          type="button"
          disabled={ searchInput.length < arbValueBtn }
          data-testid="search-artist-button"
        >
          Buscar

        </button>
      </div>
    );
  }
}
