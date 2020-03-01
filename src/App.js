import React, { Component } from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
    Link
} from 'react-router-dom';
import './App.css';
import Search from './Search';
import Favorites from './Favorites';
import Login from './Login.js';
import PrivateRoute from './PrivateRoute.js';

export default class App extends Component {
    state = { user: null };
    setUser = user => {
      this.setState({user: user.body});
    }

    render () {
      return (
        <div className="App">
          <BrowserRouter>
            <Link to='/favorites'>Favorites</Link>
            <Link to='/'>Search</Link>
            <Link to='/login'>Login</Link>
            <Switch>
                <PrivateRoute exact path='/' component={Search} user={this.state.user} />
                <PrivateRoute exact path='/favorites' component={Favorites} user={this.state.user} />
                <Route exact path='/login' render={(props) => <Login {...props} setUser={ this.setUser } user={this.state.user }/>} />
            </Switch>
          </BrowserRouter>
        </div>
      );
    }
}

