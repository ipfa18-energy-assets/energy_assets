import React from 'react';
import { Button, Alert, Container, Row, Col } from 'reactstrap';
import web3 from './web3.js';
import mainContract from './mainContract.js';
import './App.css';
import VehicleOwners from './VehicleOwners.js';
import UtilityCompanies from './UtilityCompanies.js';
import FossilFuelCompanies from './FossilFuelCompanies.js';
import certificate from './images/certificate.png'
import faq from './images/faq.png'
import blockchain from './images/blockchain.png'

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
                <p className="lead">The Problem: Electric vehicle users in California are not appropriately compensated for their carbon offsets</p>
                <hr className="my-2" />
                <p className="lead">Our Solution: A transparent blockchain platform where credits are issued and can be sold in real time</p>
                <br className="display-1"></br>
                <br className="display-1"></br>
                <br className="display-1"></br>
                <Container>
                  <Row>
                    <Col>
                      <img class="center" src={certificate} alt="LCFS credits" height="150"></img>
                      <p className="lead">What are LCFS credits?</p>
                      <hr className="my-2" />
                      <p>Low Carbon Fuel Standard (LCFS) credits were created as part of a program to reduce greenhouse gases enacted through AB 32, the 2006 Global Warming Solutions Act, signed in to law by then Governor Schwarzenegger.</p>
                    </Col>
                    <Col>
                      <img class="center" src={faq} alt="problem" height="150"></img>
                      <p className="lead">What is the problem?</p>
                      <hr className="my-2" />
                      <p>Utility companies do not have access to the required data to track at-home charging patterns, resulting in electric vehicle owners in California not compensated appropriately for their carbon offsets.</p>
                    </Col>
                    <Col>
                      <img class="center" src={blockchain} alt="blockchain" height="150"></img>
                      <p className="lead">Why Blockchain?</p>
                      <hr className="my-2" />
                      <p>Blockchain provides trust among different parties by keeping accountablility in an immutable ledger, provides a distributed database, and allows energy charges to be tracked instantly.</p>
                    </Col>
                  </Row>
                </Container>
                <br className="display-1"></br>
                <br className="display-1"></br>
                <br className="display-1"></br>
                <br className="display-1"></br>
                <div className="App">
                  <p className="lead">CONTACT US</p>
                </div>
                <hr className="my-2" />
                <p className="App">Learn more, schedule a demo, or speak with a member of our team.</p>
                <br className="display-5"></br>
                <Button className="center" color="white">Contact Us</Button>
                <br className="display-1"></br>
                <br className="display-1"></br>
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
