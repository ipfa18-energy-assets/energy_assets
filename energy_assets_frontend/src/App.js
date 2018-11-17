// src/App.js
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import SplashPage from './components/SplashPage'
import Login from './components/Login'
import Account from './components/AccountTemplate'
import Tradeing from './components/EthereumTradingCard'

class App extends Component {
    render() {
        return (
            <div>
              <Switch>
                <Route exact path='/' component={SplashPage}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/account' component={Account}/>
                <Route exact path='/EthereumTradingCard' component= {Tradeing}/>
              </Switch>
            </div>
        );
    }
}
export default App
