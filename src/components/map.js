import React, { Component } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl';

import CityPin from './city-pin';
import CityInfo from './city-info';

const TOKEN = ''; // Set your mapbox token here

const fullscreenControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

export default class Mapp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        width: 100+"vw",
        height: 100+"vh",
        latitude: 13,
        longitude: 77.6,
        zoom: 11,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null
    };
  }

  _updateViewport = (viewport) => {
    this.setState({ viewport });
  }

  _renderCityMarker = (city, index) => {
    if (city) {
      return (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude} >
          <CityPin size={20} 
            onClick={() => this.setState({ popupInfo: city })} 
          />
        </Marker>
      );
    }
  }

  _renderPopup() {
    const { popupInfo } = this.state;

    return popupInfo && (
      <Popup tipSize={5}
        anchor="top"
        longitude={popupInfo.longitude}
        latitude={popupInfo.latitude}
        closeOnClick={false}
        onClose={() => this.setState({ popupInfo: null })} >
        <CityInfo info={popupInfo} />
      </Popup>
    );
  }

  render() {

    const { viewport } = this.state;

    return (
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={TOKEN} >

        {this.props.cities.map(this._renderCityMarker)}

        {this._renderPopup()}

        <div className="fullscreen" style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div className="nav" style={navStyle}>
          <NavigationControl onViewportChange={this._updateViewport} />
        </div>

      </ReactMapGL>
    );
  }

}
