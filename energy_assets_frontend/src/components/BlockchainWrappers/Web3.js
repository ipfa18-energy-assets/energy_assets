//Currently not in use because I could not get it to work
import Web3 from 'web3';

//const web3 = new Web3(window.web3.currentProvider);
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
export default web3;
