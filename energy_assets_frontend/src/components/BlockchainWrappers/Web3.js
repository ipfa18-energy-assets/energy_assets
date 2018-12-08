//overrides metamask v0.2 for our 1.0 version.
//1.0 lets us use async and await instead of promises
import Web33 from 'web3';

const web3 = new Web33(window.web3.currentProvider);
export default web3;
