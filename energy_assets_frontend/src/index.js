import React from 'react'
import {render} from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import Web3 from 'web3';
import Web3Provider from 'react-web3-provider';

render (
    <BrowserRouter>
      <Web3Provider
          defaultProvider={(cb) => cb(new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/577e42a4f537458993b35223841a946a")))}
          loading="Loading..."
          error={(err) => `Connection error: ${err.message}`}
      >
          <App />
      </Web3Provider>
    </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
