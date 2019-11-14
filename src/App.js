import React from 'react';
import GoogleMapReact from 'google-map-react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Harrisburg Brewery Browser</h1>
        <BreweryComponent></BreweryComponent>
      </header>
    </div>
  );
}

export default App;

class BreweryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://api.openbrewerydb.org/breweries?by_city=harrisburg")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="table-responsive">
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Address</th>
                <th scope="col">Website</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.brewery_type}</td>
                  <td>{item.street}</td>
                  <td><a href={item.website_url} title={`Navigate to the website of ${item.name}`} >{item.website_url}</a><SimpleMap lat={item.latitude} lng={item.longitude}></SimpleMap></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

const Marker = () => {
  return (
    <div className="Map-marker"
      style={{ backgroundColor: 'red', cursor: 'pointer'}}
    />
  );
};

//const MapMarker = () => <i className="fas fa-beer"></i>;
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
          //yesIWantToUseGoogleMapApiInternals
          lat = {this.props.lat}
          lng = {this.props.lng}
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