/**
 * Created by taranjeet.s on 1/4/2017.
 */
import React,{ Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';

import AlbumDetail from './AlbumDetail';


class AlbumList extends Component {
    //component state
    state = { albums : [] }
    //using life cycle methods
    componentWillMount() {
        axios.get('https://rallycoding.herokuapp.com/api/music_albums')
            .then(response => this.setState({ albums : response.data }));
    }

    renderAlbums() {
         return this.state.albums.map(album => {
            return <AlbumDetail key={album.title} album={album}/>
         } );
    }
    //render function for react
    render() {
        return (
            <ScrollView>
                {this.renderAlbums()}
            </ScrollView>
        );
    }
}

export default AlbumList;