import React from 'react';
import GoogleMap from 'google-map-react';
import Place from './Place';

export default class DetailsMap extends React.Component{

  constructor() {
    super();
    this.state = {
      markers: [],
      currentIndex: 0
    };
  }

  componentDidMount() {
    if (this.props.location) {
      this.geocode(this.props.location);
    }

    if (this.props.addresses.length) {
      for(var i in this.props.addresses) {
        this.geocode(this.props.addresses[i].name);
      }
    }
  }

  geocode(addressString) {
    var self = this;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        "address" : addressString
      },
      function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          var markers = self.state.markers;
          markers.push({
            title: addressString,
            lng: results[0].geometry.bounds.La.j,
            lat: results[0].geometry.bounds.Pa.j
          });

          self.setState({
            markers: markers
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      }
    );
  }

  handleItemClick(index) {
    this.setState({
      currentIndex: index
    });
  }

  render() {
    var placesItems = [];
    var defaultProps = {
      center: [50.45, 30.523333],
      zoom: 15
    };

    var places = this.state.markers.map(function (item) {
      return (
        <Place lat={item.lat} lng={item.lng} text={item.title}/>
      )
    });

    if (this.state.markers.length) {
      defaultProps.center = [
        this.state.markers[this.state.currentIndex].lat,
        this.state.markers[this.state.currentIndex].lng
      ];
    }

    for (var i in this.state.markers) {
      placesItems.push(<li onClick={this.handleItemClick.bind(this, i)}>{this.state.markers[i].title}</li>)
    }
    return (
      <div className="places-map">
        <GoogleMap
          center={defaultProps.center}
          zoom={defaultProps.zoom}>
            {places}
        </GoogleMap>
        <div className="places-items">
          <ul>
            {placesItems}
          </ul>
        </div>
      </div>
    );

  }
}
