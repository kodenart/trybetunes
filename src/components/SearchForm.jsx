import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchForm extends Component {
  render() {
    const { searchInput, searched, albumList, updateSI, searchAlbumsBtn } = this.props;
    const arbValueBtn = 2;
    return (
      <div>
        {/* falta implementar a lógica para que CASO TENHA SIDO PESQUISADO ALGO, RETORNE OS CARDS ETC */}
        {/* {searched ? } */}
        <div className="searchForm">
          <input
            type="text"
            value={ searchInput }
            onChange={ updateSI }
            data-testid="search-artist-input"
          />
          <button
            type="button"
            disabled={ searchInput.length < arbValueBtn }
            data-testid="search-artist-button"
            onClick={ searchAlbumsBtn }
          >
            Buscar
          </button>
        </div>
      </div>
    );
  }
}

SearchForm.propTypes = {
  searchInput: PropTypes.string.isRequired,
  updateSI: PropTypes.func.isRequired,
  searched: PropTypes.bool.isRequired,
  albumList: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchAlbumsBtn: PropTypes.func.isRequired,
};
