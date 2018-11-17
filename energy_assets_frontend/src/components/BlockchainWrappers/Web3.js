//Currently not in use because I could not get it to work
import Web3 from 'web3';

//
let web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
if (!web3.isConnected()) {
  web3 = new Web3(window.web3.currentProvider);
}
export default web3;
