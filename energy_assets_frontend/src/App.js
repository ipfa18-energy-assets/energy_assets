// src/App.js
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import SplashPage from './components/SplashPage'
import Login from './components/Login'
import Account from './components/AccountTemplate'

class App extends Component {
    render() {
        return (
            <div>
              <Switch>
                <Route exact path='/' component={SplashPage}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/account' component={Account}/>
              </Switch>
            </div>
        );
    }
}
export default App
