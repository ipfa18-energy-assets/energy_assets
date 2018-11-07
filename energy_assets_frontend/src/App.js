// src/App.js
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import SplashPage from './components/SplashPage'
import Login from './components/Login'
class App extends Component {
    render() {
        return (
            <div>
              <Switch>
                <Route exact path='/' component={SplashPage}/>
                <Route exact path='/login' component={Login}/>
              </Switch>
            </div>
        );
    }
}
export default App
