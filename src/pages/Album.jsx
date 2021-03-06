import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      collectionName: '',
      resMusics: [],
      favoriteSongs: [],
    };
  }

  async componentDidMount() {
    await this.gettingMusicsInfo();
  }

  gettingMusicsInfo = async () => {
    try {
    // pegando o valor do parâmetro
      const { match: { params: { id } } } = this.props;
      const response = await getMusics(id);
      // primeiro valor do array são informações do álbum
      const albumInfo = response[0];
      // a partir do segundo índice, são as músicas
      const resMusics = response.slice(1);
      const { artistName, collectionName } = albumInfo;

      const favoriteSongs = await getFavoriteSongs(id);

      this.setState({
        artistName,
        collectionName,
        resMusics,
        favoriteSongs,
      });
    } catch (error) {
      throw error.message;
    }
  }

  render() {
    const { artistName, collectionName, resMusics, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div><h1 data-testid="album-name">{collectionName}</h1></div>
        <div><h2 data-testid="artist-name">{artistName}</h2></div>
        <div>
          {resMusics.map((music) => (
            <MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
              music={ music }
              favValue={
                favoriteSongs.some((favSong) => favSong.trackId === music.trackId)
              }
            />))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
