import React from 'react';
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
        <div class="table-responsive">
          <table class="table table-striped table-dark">
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
                <tr>
                  <td>{item.name}</td>
                  <td>{item.brewery_type}</td>
                  <td>{item.street}</td>
                  <td><a href={item.website_url} title={`Navigate to the website of ${item.name}`} >{item.website_url}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}