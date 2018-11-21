import React, { Component } from 'react';
import { ButtonGroup, Form, FormGroup, Label, Input, Table, Card, CardText, CardTitle, Button, Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import './App.css';
import mainContract from './mainContract.js';
import web3 from './web3';

class FossilFuelCompanies extends Component {

  constructor(props) {
    super(props);

    this.state = {
      DashBoard: '',
      RegisteredUsers: '',
      Withdrawal: '',
      Deposit: '',
      Buy: '',
      address: '',
      withdrawAmount: '',
      depositAmount: '',
      buyAmount: '',
      etherBalance: '',
      creditBalance: ''
    }

    this.setAddress = this.setAddress.bind(this);
    this.setInfo = this.setInfo.bind(this);
    this.setDashBoard = this.setDashBoard.bind(this);
    this.setRegisteredUsers = this.setRegisteredUsers.bind(this);
    this.setEtherWithdrawal = this.setEtherWithdrawal.bind(this);
    this.setCreditBuy = this.setCreditBuy.bind(this);
    this.setEtherDeposit = this.setEtherDeposit.bind(this);
    this.onClickDashBoard = this.onClickDashBoard.bind(this);
    this.onClickRegisteredUsers = this.onClickRegisteredUsers.bind(this);
    this.captureAmount = this.captureAmount.bind(this);
    this.withdraw = this.withdraw.bind(this);
    this.captureAmountBuy = this.captureAmountBuy.bind(this);
    this.buy = this.buy.bind(this);
    this.captureAmountDeposit = this.captureAmountDeposit.bind(this);
    this.deposit = this.deposit.bind(this);


    this.setAddress();
    this.setInfo();
    this.setDashBoard();

  }

  setAddress = async (event) => {
    const accounts = await web3.eth.getAccounts();
    this.setState({address: accounts[0]});
  }

  setInfo = async (event) => {
    const accounts = await web3.eth.getAccounts();
    let bal = await mainContract.methods.getEtherBalance().call({from: accounts[0]});
    let creditBal = await mainContract.methods.getCreditBalance().call({from: accounts[0]});
    this.setState({etherBalance: bal,
                   creditBalance: creditBal});
  }

  setDashBoard() {
    this.setState({DashBoard:   <Card body className="text-center">
                                  <CardTitle>Welcome, Fossil Fuel Generator {this.state.address}</CardTitle>
                                  <CardText>Ether Balance: {this.state.etherBalance} wei</CardText>
                                  <CardText>Credit Balance: {this.state.creditBalance}</CardText>
                                  <div class="App">
                                    <ButtonGroup>
                                      <Button onClick={this.setEtherDeposit} color="primary">Deposit Ether</Button>
                                      <Button onClick={this.setEtherWithdrawal} color="primary">Withdraw Ether</Button>
                                      <Button onClick={this.setCreditBuy} color="primary">Buy Credits</Button>
                                    </ButtonGroup>
                                  </div>
                                </Card>});
  }

  setRegisteredUsers() {
    this.setState({RegisteredUsers: <Table>
                                    <thead>
                                      <tr>
                                        <th>Date</th>
                                        <th>Amount Redeemed</th>
                                        <th>Redeemed By</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th scope="row">11/21/2018</th>
                                        <td>20000</td>
                                        <td>0x81b7E08F65Bdf5648606c89998A9CC8164397647</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">6/21/2018</th>
                                        <td>23478</td>
                                        <td>0xD66F9ADf3E2E9B03A4b009786D01Ec1dc00c977A</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">3/20/2018</th>
                                        <td>10293</td>
                                        <td>0x555Ee11FBDDc0E49A9bAB358A8941AD95fFDB48f</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">1/19/2018</th>
                                        <td>4930</td>
                                        <td>0x3E3a3D69dc66bA10737F531ed088954a9EC89d97</td>
                                      </tr>
                                    </tbody>
                                  </Table>})
  }

  onClickDashBoard = async (event) => {
    event.preventDefault();
    this.setDashBoard();
    this.setState({RegisteredUsers: '',
                    Withdrawal: '',
                    Deposit: '',
                    Buy: ''});
  }

  onClickRegisteredUsers = async (event) => {
    event.preventDefault();
    this.setRegisteredUsers();
    this.setState({DashBoard: '',
                    Withdrawal: '',
                    Deposit: '',
                    Buy: ''});
  }

  setEtherWithdrawal () {
    this.setState({Withdrawal: <Form onSubmit={this.withdraw}>
                                  <FormGroup>
                                    <div class="App">
                                      <Label>How much ether (in wei) would you like to withdraw?</Label>
                                    </div>
                                    <Input onChange={this.captureAmount} type="number" />
                                    <div class="App">
                                      <Button type="submit">Confirm</Button>
                                    </div>
                                  </FormGroup>
                                </Form>})
    this.setState({Buy: '', Deposit: ''})
  }

  setCreditBuy () {
    this.setState({Buy: <Form onSubmit={this.buy}>
                                  <FormGroup>
                                    <div class="App">
                                      <Label>How many credits would you like to buy?</Label>
                                    </div>
                                    <Input onChange={this.captureAmountBuy} type="number" />
                                    <div class="App">
                                      <Button type="submit">Confirm</Button>
                                    </div>
                                  </FormGroup>
                                </Form>})
    this.setState({Withdrawal: '', Deposit: ''})
  }

  setEtherDeposit () {
    this.setState({Deposit: <Form onSubmit={this.deposit}>
                                  <FormGroup>
                                    <div class="App">
                                      <Label>How much ether (in wei) would you like to deposit?</Label>
                                    </div>
                                    <Input onChange={this.captureAmountDeposit} type="number" />
                                    <div class="App">
                                      <Button type="submit">Confirm</Button>
                                    </div>
                                  </FormGroup>
                                </Form>})
    this.setState({Buy: '', Withdrawal: ''})
  }


    withdraw = async (event) => {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      await mainContract.methods.etherWithdrawal(this.state.withdrawAmount).send({from: accounts[0]});
      this.setInfo();
    }

    captureAmount = (event) => {
        event.preventDefault();
        const x = event.target.value;
        this.setState({withdrawAmount: x});
    };

    deposit = async (event) => {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      await mainContract.methods.etherDeposit().send({from: accounts[0], value: this.state.depositAmount});
      this.setInfo();
    }

    captureAmountDeposit = (event) => {
        event.preventDefault();
        const x = event.target.value;
        this.setState({depositAmount: x});
    };

    buy = async (event) => {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      await mainContract.methods.buy(this.state.buyAmount).send({from: accounts[0]});
      this.setInfo();
    }

    captureAmountBuy = (event) => {
        event.preventDefault();
        const x = event.target.value;
        this.setState({buyAmount: x});
    };

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Home</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Button color="link" onClick={this.onClickRegisteredUsers}>Redeem History</Button>
            </NavItem>
            <NavItem>
              <Button color="link" onClick={this.onClickDashBoard}>Sign In to Dashboard</Button>
            </NavItem>
          </Nav>
        </Navbar>
        <div class="all">
          {this.state.DashBoard}
          {this.state.RegisteredUsers}
          {this.state.Withdrawal}
          {this.state.Deposit}
          {this.state.Buy}
        </div>
      </div>
    );
  }
}

export default FossilFuelCompanies;
