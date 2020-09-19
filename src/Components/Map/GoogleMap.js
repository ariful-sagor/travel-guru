
import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class GoogleMap extends Component {
render() {
        return (       
            <Map style={{width: '400px', borderRadius:'10px'}}  google={this.props.google} zoom={14}>
       
                    <Marker onClick={this.onMarkerClick}
                            name={'Current location'} />
      
                    <InfoWindow onClose={this.onInfoWindowClose}>
                          
                    </InfoWindow>
                </Map>
        );   
    }
      
  };
  export default GoogleApiWrapper({
      apiKey: ('AIzaSyAcMDM18zHVcfZE760W2QipyVhsOf5sV1o')
    })(GoogleMap)
