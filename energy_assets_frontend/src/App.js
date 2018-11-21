import React from 'react';
import { Button, Alert } from 'reactstrap';
import web3 from './web3.js';
import mainContract from './mainContract.js';
import './App.css';
import VehicleOwners from './VehicleOwners.js';
import UtilityCompanies from './UtilityCompanies.js';
import FossilFuelCompanies from './FossilFuelCompanies.js';

export default class App extends React.Component {

  onClickSignIn = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    let type = await mainContract.methods.getAddressType().call({
      from: accounts[0]
    });
    if (type == 1) {
      this.setState({Warning: ''})
      this.setState({HomePage: ''});
      this.setState({DashBoard: <VehicleOwners />});
    } else if (type == 2) {
      this.setState({Warning: ''})
      this.setState({HomePage: ''});
      this.setState({DashBoard: <UtilityCompanies />});
    } else if (type == 3) {
      this.setState({Warning: ''})
      this.setState({HomePage: ''});
      this.setState({DashBoard: <FossilFuelCompanies />});
    } else {
      this.setState({Warning: <Alert color="success">
                                You have not registered as an authorized actor. Please register with relative parties.
                              </Alert>});
    }
  }

  state = {
    HomePage: <div class="bg">
                <p class="right">
                  <Button onClick={this.onClickSignIn} color="white">Portal</Button>
                </p>
                <br className="display-3"></br>
                <br className="display-3"></br>
                <h1 className="display-3">Charge. Save. Relax.</h1>
                <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                <hr className="my-2" />
                <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                <br className="display-3"></br>
                <br className="display-3"></br>
                <br className="display-3"></br>
                <br className="display-3"></br>
                <br className="display-3"></br>
              </div>,
    Warning: '',
    DashBoard: ''
  }

  render() {
    return (
      <div>
        {this.state.Warning}
        {this.state.HomePage}
        {this.state.DashBoard}
      </div>
    );
  }

}
