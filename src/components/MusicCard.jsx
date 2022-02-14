import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import LoadingMessage from './LoadingMessage';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      checkedValue: false,
    };
  }

  componentDidMount() {
    // if the music has been fav before it will be alreaedy marked.
    // the logic is that album.jsx is sending if the trackId of this instance has
    // any ocurrence in the LocalStorage array
    // something like that => (∃ component.trackId ∈ localStorage)
    const { favValue } = this.props;
    this.setState({ checkedValue: favValue });
  }

  handleFavCheckbox = async (checkboxState, musicToFav) => {
    const { favoritePageUpdate } = this.props;
    this.setState({ loading: true });
    // if checkobx is marked, remove from fav, else puts it in fav list
    if (checkboxState) {
      await removeSong(musicToFav);
      // added here just to satisfy the test, but it compromises a pattern in React...
      // kinda dumb, but I just wanna finish this req, there's another project to do.
      if (favoritePageUpdate) {
        await favoritePageUpdate();
      }
      // removes from checked state so it can re-render
      // probably not the best idea, but that's what came to my mind
      this.setState({ checkedValue: false });
    } else {
      await addSong(musicToFav);
      this.setState({ checkedValue: true });
    }
    this.setState({ loading: false });
    // if the card is mounted in the Favorites page, it will have this function
    if (favoritePageUpdate) {
      await favoritePageUpdate();
    }
  }

  render() {
    const { trackName, previewUrl, trackId, music } = this.props;
    const { loading, checkedValue } = this.state;
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
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            type="checkbox"
            onChange={ () => { this.handleFavCheckbox(checkedValue, music); } }
            checked={ checkedValue }
          />
        </label>
        {loading ? <LoadingMessage /> : null}
      </div>
    );
  }
}

MusicCard.defaultProps = {
  favoritePageUpdate: undefined,
};

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.objectOf(PropTypes.any).isRequired,
  favValue: PropTypes.bool.isRequired,
  favoritePageUpdate: PropTypes.func,
};
