import React, { Component } from 'react';
import TheRock from './components/TheRock'
import TheCandyAss from './components/TheCandyAss'
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
// import BigNumber from 'web3';

const WEB3 = new Web3()

const ETHEREUM_CLIENT = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

const ROCK_ABI = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "interactions",
    "outputs": [
      {
        "name": "player1",
        "type": "address"
      },
      {
        "name": "player2",
        "type": "address"
      },
      {
        "name": "player2FailureCount",
        "type": "uint256"
      },
      {
        "name": "player1FailureCount",
        "type": "uint256"
      },
      {
        "name": "periodLength",
        "type": "uint256"
      },
      {
        "name": "periodCount",
        "type": "uint256"
      },
      {
        "name": "periodOn",
        "type": "uint256"
      },
      {
        "name": "amountLost",
        "type": "uint256"
      },
      {
        "name": "playerAmount",
        "type": "uint256"
      },
      {
        "name": "charity",
        "type": "address"
      },
      {
        "name": "interactionOver",
        "type": "bool"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_player1Result",
        "type": "bool"
      },
      {
        "name": "_player2Result",
        "type": "bool"
      }
    ],
    "name": "nextPeriod",
    "outputs": [],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "periodLength",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getFailureCounts",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getInteractionResults",
    "outputs": [
      {
        "name": "",
        "type": "bool[]"
      },
      {
        "name": "",
        "type": "bool[]"
      }
    ],
    "payable": false,
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_playerAmount",
        "type": "uint256"
      },
      {
        "name": "_player1",
        "type": "address"
      },
      {
        "name": "_player2",
        "type": "address"
      },
      {
        "name": "_periodLength",
        "type": "uint256"
      },
      {
        "name": "_periodCount",
        "type": "uint256"
      },
      {
        "name": "_charity",
        "type": "address"
      }
    ],
    "name": "startInteraction",
    "outputs": [],
    "payable": true,
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "type": "constructor"
  }
]

const ROCK_ADDRESS = '0x85dc67fc610933b248d0f490f7d3c5a95e8437fc'
//
const ROCK_APP = ETHEREUM_CLIENT.eth.contract(ROCK_ABI).at(ROCK_ADDRESS)


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'main',
    };
    this._onRockClick = this._onRockClick.bind(this);
    this._onCandyAssClick = this._onCandyAssClick.bind(this);
    this._onMainClick = this._onMainClick.bind(this);
  }

  componentDidMount() {
    console.log(ROCK_APP.owner())
    this._setupAccount()
    this.startInteraction()
    this.getInteractionResults()
    this.getFailureCounts()
    this.nextPeriod()
    this.getFailureCounts()
  }

  _setupAccount() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)

    this.setState({
      account: ETHEREUM_CLIENT.toChecksumAddress(ETHEREUM_CLIENT.eth.accounts[0]),
      balance: ETHEREUM_CLIENT.fromWei( (ETHEREUM_CLIENT.eth.getBalance(ETHEREUM_CLIENT.eth.accounts[0])), 'ether') .toString()
    })
  }

  _onMainClick() {
    this.setState({
      view: 'main',
    });
  }

  _onRockClick() {
    this.setState({
      view: 'rock',
    });
  }

  _onCandyAssClick() {
    this.setState({
      view: 'candyass',
    });
  }

  async startInteraction() {
    let playerAmount = 100;
    let player1 = ETHEREUM_CLIENT.eth.accounts[1];
    let player2 = ETHEREUM_CLIENT.eth.accounts[2];
    let periodLength = 0;
    let periodCount = 52;
    let charity = ETHEREUM_CLIENT.eth.accounts[3];
    console.log(charity);
    await ROCK_APP.startInteraction(
      playerAmount,
      player1,
      player2,
      periodLength,
      periodCount,
      charity,
      {from: ETHEREUM_CLIENT.eth.accounts[0], gas: 4000000, value: 20*10**18}
    );
  }

  getInteractionResults() {
    let results = ROCK_APP.getInteractionResults()
    console.log(results)
    return results
  }

  getFailureCounts() {
    let failureCounts = ROCK_APP.getFailureCounts();
    console.log(failureCounts[1].toNumber())
    return failureCounts
  }

  async nextPeriod() {
    let player1Result = true;
    let player2Result = false;
    await ROCK_APP.nextPeriod(
      player1Result,
      player2Result,
      {from: ETHEREUM_CLIENT.eth.accounts[0], gas: 4000000}
    );
  }

  render() {
    let this_view;
    if (this.state.view === 'rock') {
      this_view = <TheRock />
    } else if (this.state.view === 'candyass') {
      this_view = <TheCandyAss />
    }
    return (
      <div>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>The Rock Project: The Ultimate Candy Ass Exercise Motivator</h2>
        </div>
        <img src="http://cdn.playbuzz.com/cdn/bcc20b71-c445-4454-8f17-909649613d17/724ec973-9b6e-4187-b4d6-c17f9d67bd7a.jpg" alt="some_text" style="width:width;height:height;"/>
        <p>Your candy ass can't get yourself to the gym. So what do you do? You team up with a buddy and both put Ether into a pool.</p>
        <p>Every week, if you fight off your candy ass ways and meet your fitness goals, you keep your Ether. </p>

        <p>Your account: {this.state.account}</p>
        <p>Your balance: {this.state.balance}</p>
        <button onClick={this._onMainClick}>Home</button>
        <button onClick={this._onRockClick}>The Rock</button>
        <button onClick={this._onCandyAssClick}>CandyAss</button>
        { this_view }
        </div>
      </div>
    );
  }
}

export default App;
