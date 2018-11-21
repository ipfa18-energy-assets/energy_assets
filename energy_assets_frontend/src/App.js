// src/App.js
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import SplashPage from './components/SplashPage'
import Login from './components/Login'
import Tradeing from './components/EthereumTradingCard'
import Account from './components/AccountTemplate'
import Register from './components/Tabs/Register'


class App extends Component {
    render() {
        return (
            <div>
              <Switch>
                <Route exact path='/' component={SplashPage}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/EthereumTradingCard' component= {Tradeing}/>
                <Route exact path='/account' component={Account}/>
                <Route exact path='/register' component={Register}/>

              </Switch>
            </div>
        );
    }
}
export default App
