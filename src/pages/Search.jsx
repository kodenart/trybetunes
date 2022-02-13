import React, { Component } from 'react';
import Header from '../components/Header';
import LoadingMessage from '../components/LoadingMessage';
import SearchForm from '../components/SearchForm';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      loading: false,
      searched: false,
      albumList: [],
      searchedStr: '',
    };
  }

  updateSI = ({ target }) => {
    this.setState({ searchInput: target.value });
  }

  searchAlbumsBtn = async () => {
    const { searchInput } = this.state;
    this.setState({ loading: true });
    const albumArr = await searchAlbumsAPI(searchInput);
    this.setState({ albumList: albumArr,
      loading: false,
      searched: true,
      searchedStr: searchInput,
      searchInput: '' });
  }

  render() {
    const { searchInput, loading, searched, albumList, searchedStr } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading
          ? <LoadingMessage />
          : (
            <SearchForm
              searchedStr={ searchedStr }
              searchInput={ searchInput }
              searched={ searched }
              albumList={ albumList }
              updateSI={ this.updateSI }
              searchAlbumsBtn={ this.searchAlbumsBtn }
            />
          )}
      </div>
    );
  }
}
