import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom'
import Client from './components/Client'
import Admin from './components/Admin'
class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className = 'App'>
          <Route path='/client' render={props => <Client {...props} />} />
            <Route path='/admin' render={props => <Admin {...props} />} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
