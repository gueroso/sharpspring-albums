import React from 'react';
import { Image } from "react-bootstrap";
import moment from 'moment';
import styles from '../App.css';

const AlbumTile = props => {
  return (
    <div className="rounded-corners tile-background">
      <Image className="center-block" src={ props.artworkUrl100 } rounded/><br />
      <p class="album-text" align="center">{ props.collectionName }</p>
      <p align="center">Year Released: { props.releaseDate }</p>
    </div>
  )
}

export default AlbumTile
