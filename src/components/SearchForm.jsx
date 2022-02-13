import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AlbumCard from './AlbumCard';

export default class SearchForm extends Component {
  render() {
    const { searchInput,
      searched,
      albumList,
      updateSI,
      searchAlbumsBtn,
      searchedStr } = this.props;

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
        <div className="albumList">

          {albumList.length
            ? (
              <p>
                Resultado de álbuns de:
                {' '}
                {searchedStr}
              </p>
            )
            : null}

          {searched
            ? albumList.map((album) => (
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                key={ album.collectionId }
                to={ `/album/${album.collectionId}` }
              >
                <AlbumCard
                  key={ album.collectionId }
                  collectionName={ album.collectionName }
                  artistName={ album.artistName }
                  artworkUrl100={ album.artworkUrl100 }
                />
              </Link>
            ))
            : null}

          {searched && albumList.length === 0 ? <p>Nenhum álbum foi encontrado</p> : null}
        </div>
      </div>
    );
  }
}

SearchForm.propTypes = {
  searchInput: PropTypes.string.isRequired,
  searchedStr: PropTypes.string.isRequired,
  updateSI: PropTypes.func.isRequired,
  searched: PropTypes.bool.isRequired,
  albumList: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchAlbumsBtn: PropTypes.func.isRequired,
};
