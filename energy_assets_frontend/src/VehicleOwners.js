import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Table, Card, CardText, CardTitle, Button, Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import './App.css';
import mainContract from './mainContract.js';
import web3 from './web3';

class VehicleOwners extends Component {

  setAddress = async (event) => {
    const accounts = await web3.eth.getAccounts();
    this.setState({address: accounts[0]});
  }

  setInfo = async (event) => {
    const accounts = await web3.eth.getAccounts();
    let bal = await mainContract.methods.getUserBalance().call({from: accounts[0]});
    let util = await mainContract.methods.getUserUtilityCompany().call({from: accounts[0]});
    this.setState({balance: bal,
                   utilityCompany: util});
  }

  setDashBoard() {
    this.setState({DashBoard:   <Card body className="text-center">
                                  <CardTitle>Welcome, user {this.state.address}</CardTitle>
                                  <CardText>Utility Company: {this.state.utilityCompany}</CardText>
                                  <CardText>Current balance: ${this.state.balance}</CardText>
                                  <Button onClick={this.setWithdrawal} color="primary">Withdraw</Button>
                                </Card>});
  }

  setHistory() {
    this.setState({ChargeHistory: <Table>
                                    <thead>
                                      <tr>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Plate Number</th>
                                        <th>Amount Charged</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th scope="row">11/21/2018</th>
                                        <td>17:50</td>
                                        <td>5LIK274</td>
                                        <td>$9.34</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">11/21/2018</th>
                                        <td>06:02</td>
                                        <td>5LIK274</td>
                                        <td>$10.30</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">11/20/2018</th>
                                        <td>22:15</td>
                                        <td>5LIK274</td>
                                        <td>$15.29</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">11/19/2018</th>
                                        <td>21:32</td>
                                        <td>5LIK274</td>
                                        <td>$18.83</td>
                                      </tr>
                                    </tbody>
                                  </Table>})
  }

  setRV() {
    this.setState({RegisteredVehicles: <Table>
                                          <thead>
                                            <tr>
                                              <th>#</th>
                                              <th>Plate Number</th>
                                              <th>Oracle ID</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr>
                                              <th scope="row">1</th>
                                              <td>5LIK274</td>
                                              <td>0x59ef4243fd8d8b6e90bf83f54ef004a5e90886ab</td>
                                            </tr>
                                          </tbody>
                                        </Table>});
  }

  setWithdrawal() {
    this.setState({Withdrawal: <Form onSubmit={this.withdraw}>
                                  <FormGroup>
                                    <div class="App">
                                      <Label>Amount</Label>
                                    </div>
                                    <Input onChange={this.captureAmount} type="number" />
                                    <div class="App">
                                      <Button type="submit">Confirm</Button>
                                    </div>
                                  </FormGroup>
                                </Form>});
  }

  withdraw = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await mainContract.methods.userWithdrawal(this.state.amount).send({from: accounts[0]});
    this.setInfo();
  }

  captureAmount = (event) => {
      event.preventDefault();
      const x = event.target.value;
      this.setState({amount: x});
  };

  constructor(props) {
    super(props);

    this.state = {
      DashBoard: '',
      RegisteredVehicles: '',
      ChargeHistory: '',
      Withdrawal: '',
      amount: '',
      address: '',
      balance: '',
      utilityCompany: ''
    }

    this.setAddress = this.setAddress.bind(this);
    this.setInfo = this.setInfo.bind(this);
    this.setDashBoard = this.setDashBoard.bind(this);
    this.setHistory = this.setHistory.bind(this);
    this.setRV = this.setRV.bind(this);
    this.setWithdrawal = this.setWithdrawal.bind(this);
    this.captureAmount = this.captureAmount.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.onClickDashBoard = this.onClickDashBoard.bind(this);
    this.onClickRegisteredVehicles = this.onClickRegisteredVehicles.bind(this);
    this.onClickChargeHistory = this.onClickChargeHistory.bind(this);

    this.setAddress();
    this.setInfo();
    this.setDashBoard();

  }

  onClickDashBoard = async (event) => {
    event.preventDefault();
    this.setDashBoard();
    this.setState({ChargeHistory: '', RegisteredVehicles: '', Withdrawal: ''});
  }

  onClickRegisteredVehicles = async (event) => {
    event.preventDefault();
    this.setRV();
    this.setState({ChargeHistory: '', DashBoard: '', Withdrawal: ''});
  }

  onClickChargeHistory = async (event) => {
    event.preventDefault();
    this.setHistory();
    this.setState({DashBoard: '', RegisteredVehicles: '', Withdrawal: ''});
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Home</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Button color="link" onClick={this.onClickChargeHistory}>Charge History</Button>
            </NavItem>
            <NavItem>
              <Button color="link" onClick={this.onClickRegisteredVehicles}>Registered Vehicles</Button>
            </NavItem>
            <NavItem>
              <Button color="link" onClick={this.onClickDashBoard}>Sign In to Dashboard</Button>
            </NavItem>
          </Nav>
        </Navbar>
        <div class="all">
          {this.state.DashBoard}
          {this.state.RegisteredVehicles}
          {this.state.ChargeHistory}
          {this.state.Withdrawal}
        </div>
      </div>
    );
  }
}

export default VehicleOwners;
