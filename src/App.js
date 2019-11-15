import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Nav from './components/Nav'
import About from './components/About'
import BreweryDetail from './components/BreweryDetail'
import BreweryList from './components/BreweryList'
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

export default function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/list" component={BreweryList} />
          <Route path="/detail/:id" component={BreweryDetail} />
        </Switch>
      </div>
    </Router>
  );
}