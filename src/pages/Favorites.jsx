import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favSongs: false,
    };
  }

  async componentDidMount() {
    await this.favoritePageUpdate();
  }

  favoritePageUpdate = async () => {
    const favSongs = await getFavoriteSongs();
    this.setState({ favSongs });
  }

  render() {
    const { favSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {favSongs ? favSongs.map((music) => (
          <MusicCard
            key={ music.trackId }
            favValue
            trackName={ music.trackName }
            trackId={ parseInt(music.trackId, 10) }
            previewUrl={ music.previewUrl }
            music={ music }
            favoritePageUpdate={ this.favoritePageUpdate }
          />)) : null}
      </div>
    );
  }
}
