import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';

function BreweryDetail({ match }) {
  useEffect(() => {
    fetchItem();
  }, []);

  const [item, setItem] = useState({});

  const fetchItem = async () => {
    const fetchItem = await fetch(`https://api.openbrewerydb.org/breweries/${match.params.id}`);
    const item = await fetchItem.json();
    setItem(item);
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm">      <ul>
          <li>{item.name}</li>
          <li>{item.street}</li>
          <li>{item.city}, {item.state} {item.postal_code}</li>
        </ul>
        </div>
        <div className="col-sm">
          <SimpleMap lat={item.latitude} lng={item.longitude}></SimpleMap>
        </div>
      </div>
    </div>
  );
}

const Marker = () => {
  return (
    <div className="map-marker"
      style={{ backgroundColor: 'red', cursor: 'pointer' }}
    />
  );
};

class SimpleMap extends React.Component {
  static defaultProps = {
    center: {
      lat: 40.269722,
      lng: -76.875556
    },
    zoom: 13
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCQ7pLhrYUB8lbMmw93gNcHuZCRpB5miXc' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          lat={this.props.lat}
          lng={this.props.lng}
        >
          <Marker
            lat={this.props.lat}
            lng={this.props.lng}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default BreweryDetail;