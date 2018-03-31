import React, { Component } from 'react';
import './App.css';
import Nav from './Component/Nav/Nav';
import Dashboard from './Component/Dashboard/Dashboard';
import Auth from './Component/Auth/Auth';
import Post from './Component/Post/Post';
import Form from './Component/Form/Form';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Nav/>
      <Switch>
      <Route path={`/dashboard`} component={Dashboard}/>
      <Route path={`/post/:id`} component={Post}/>
      <Route path={`/new`} component={Form}/>
      <Route path={`/`} component={Auth}/>
      </Switch>

      </div>
    );
  }
}

export default App;
