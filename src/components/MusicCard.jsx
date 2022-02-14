import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import LoadingMessage from './LoadingMessage';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  handleFavCheckbox = async (musicToFav) => {
    this.setState({ loading: true });
    await addSong(musicToFav);
    this.setState({ loading: false });
  }

  render() {
    const { trackName, previewUrl, trackId, music } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          Favorite
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            type="checkbox"
            onChange={ () => { this.handleFavCheckbox(music); } }
          />
        </label>
        {loading ? <LoadingMessage /> : null}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.objectOf(PropTypes.any).isRequired,
};
