import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class AlbumCard extends Component {
  render() {
    const { artworkUrl100, collectionName, artistName } = this.props;
    return (
      <div className="albumCard">
        <img src={ artworkUrl100 } alt={ collectionName } />
        <p>{collectionName}</p>
        <p>{artistName}</p>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artworkUrl100: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
};
