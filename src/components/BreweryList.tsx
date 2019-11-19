import React from 'react';
import {
  Link
} from "react-router-dom";

interface BreweryListProps {
  error: any,
  isLoaded: any,
  items: any
}

// Interface used to define the types for the UI display of the brewery details.
interface BreweryDetails {
  id: number,
  name: string,
  brewery_type: string,
  street: string,
  website_url: string
}

class BreweryList extends React.Component<{}, BreweryListProps> {
  constructor(props: any) {
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
        <div className="container">
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Address</th>
                  <th scope="col">Website</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item: BreweryDetails) => (
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
        </div>
      );
    }
  }
}

export default BreweryList;