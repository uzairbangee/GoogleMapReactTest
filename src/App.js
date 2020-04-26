import React, {Component, Fragment} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css'
import Geocode from "react-geocode";

class App extends Component {

  state = {
    lat: 24.8531846,
    lng: 67.0166725,
    zoom: 15,
    search: "",
    markup: false
  };

  handleChange = (event) => {
    this.setState({search: event.target.value});
  }

  onSearch = (event) => {
    event.preventDefault();
    Geocode.setApiKey("AIzaSyBnAnyYy8DPvd-sZM3IgGk485HApkbWxZA");
    Geocode.setLanguage("en");
    Geocode.setRegion("pk");
    Geocode.enableDebug();

    Geocode.fromAddress(this.state.search +" in Pakistan").then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({lat: lat, lng: lng, markup: true});
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
  }
 
  render() {
    console.log(this.state);
    return (
      // Important! Always set the container height explicitly
      <Fragment>
          <div className="edit">
            <h1 className="h3">ADDRESS FINDER</h1>
            <form onSubmit={this.onSearch}>
              <input name="search" type='text' className="textbar" placeholder="Search" onChange={this.handleChange}></input>
              <button type='submit' className="submit"><i className="fa fa-search"></i></button>
            </form>
          </div>
        
      <div style={{ height: '100vh', width: '100vw'}}>
        <Map
            google={this.props.google}
            zoom={this.state.zoom}
            center={{ lat: this.state.lat, lng: this.state.lng}}
            style={{width: '100%', height: '100%'}}
            initialCenter={{ lat: this.state.lat, lng: this.state.lng}}
          >
          {this.state.markup
          &&
          <Marker title={this.state.search}
                  name={this.state.search}
                  position={{ lat: this.state.lat, lng: this.state.lng}} />
          }
          {this.state.markup
          &&
          <InfoWindow onClose={this.onInfoWindowClose}>
                  <div>
                    <h1>{this.state.search}</h1>
                  </div>
              </InfoWindow>
          }
        </Map>
      </div>
      </Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBjM7wHvs9daojQUeSMIh6ZvWxqnzjEpTo')
})(App)
