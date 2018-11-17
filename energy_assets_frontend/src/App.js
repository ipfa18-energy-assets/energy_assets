// src/App.js
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import SplashPage from './components/SplashPage'
import Login from './components/Login'
import Tradeing from './components/EthereumTradingCard'
import UserAccount from './components/AccountComponents/UserAccount'
import UCAccount from './components/AccountComponents/UCAccount'
import FFGAccount from './components/AccountComponents/FFGAccount'

class App extends Component {
    render() {
        return (
            <div>
              <Switch>
                <Route exact path='/' component={SplashPage}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/EthereumTradingCard' component= {Tradeing}/>
                <Route exact path='/useraccount' component={UserAccount}/>
                <Route exact path='/ucaccount' component={UCAccount}/>
                <Route exact path='/ffgaccount' component={FFGAccount}/>
              </Switch>
            </div>
        );
    }
}
export default App
