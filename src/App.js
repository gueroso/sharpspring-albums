import React, { Component } from 'react';
import { Grid, Jumbotron, Image, Row, Col, Clearfix } from 'react-bootstrap';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import AlbumTile from './components/AlbumTile';
import styles from './App.css';


// The Beatles' artistID
var artistId = 136975;

// Testing with Different artistId(s)

// Bassnectar's artistId
//var artistId = 2900657;

// Eminem's artistId
//var artistId = 111051;

// Queen's artistId
//var artistId = 3296287;

// The Grateful Dead's artistId
//var artistId = 1273063;

// Bonobo's artistId
//var artistId = 416281071;

// Bicep's artistId
//var artistId = 406148755;

// Pretty Lights' artistId
//var artistId = 294600594;

export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      artistName: '',
      artistLinkUrl: '',
      albums: []
    }
  }
  componentWillMount(){
    this.getAlbums()
  }

  //    Function to Make an Axios Promise based HTTP GET Request to the iTunes API 
  //        passing in an artistId (136975 = "The Beatles")
  //        returning a JSON file containing information on all albums for the given artist
  getAlbums() {
    return axios.get('https://itunes.apple.com/lookup?id=' + artistId + '&entity=album')
      .then(res => {
        const results = res.data.results
        const { artistName, artistLinkUrl } = results[0]
        let albums = results.slice(1, results.length)
        albums = this.formatDates(albums);
        albums = this.sortByYear(albums);
        this.setState({ artistName, artistLinkUrl, albums })
      })
  }
  formatDates(albums) {
    return albums.map(album => {
      album.releaseDate = moment(album.releaseDate).get('year')
      return album;
    })
  }
  sortByYear(albums) {
    return _.sortBy(albums, ['releaseDate'])
  }
  render(){
    return(
      <div className="App-background">
        <Jumbotron>
          <Grid>
            <h1>Albums by... <a target='_blank' href={this.state.artistLinkUrl}>{this.state.artistName}</a>!</h1>
            <p>Displayed using Axios promise-based HTTP GET requests from the iTunes API.</p>
          </Grid>
        </Jumbotron>

        <div>
         <Grid>
          <Row className="show-grid">
           {
              this.state.albums.map(album => {                
               return (
                   <Col sm={6} md={3}><br />
                     <AlbumTile
                       artworkUrl100={ album.artworkUrl100 }
                       collectionName= { album.collectionName }              
                       releaseDate={ album.releaseDate }
                     />
                   </Col>  
                )
              })
           }
          </Row>
         </Grid>
        </div>
      </div>
    )
  }
}
