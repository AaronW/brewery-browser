import React from 'react';
import {
  Link
} from "react-router-dom";

class BreweryList extends React.Component {
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
                    <td><Link to={`/detail/${item.id}`} >{item.name}</Link></td>
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

  export default BreweryList;