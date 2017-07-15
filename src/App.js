import React, { Component } from 'react';
import TheRock from './components/TheRock'
import TheCandyAss from './components/TheCandyAss'
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
// import BigNumber from 'web3';

const WEB3 = new Web3()

const ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'main',
    };
    this._onRockClick = this._onRockClick.bind(this);
  }

  componentDidMount() {
    this._setupAccount();
  }

  _setupAccount() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)

    this.setState({
      account: ETHEREUM_CLIENT.toChecksumAddress(ETHEREUM_CLIENT.eth.coinbase),
      balance: ETHEREUM_CLIENT.fromWei( (ETHEREUM_CLIENT.eth.getBalance(ETHEREUM_CLIENT.eth.accounts[0])), 'ether') .toString()
      // account: Web3.toChecksumAddress(Web3.eth.coinbase)
    })
  }


  _onRockClick() {
    this.setState({
      view: 'rock',
    });
  }

  render() {
    return (
      <div>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to The Rock Escrow</h2>
        </div>
        <p>Your account: {this.state.account}</p>
        <p>Your balance: {this.state.balance}</p>
        { this.state.view == 'main' ?

            <button onClick={this._onRockClick}>The Rock</button>
            // <TheCandyAss />
        :
          <TheRock />
        }
        </div>
      </div>
    );
  }
}

export default App;
