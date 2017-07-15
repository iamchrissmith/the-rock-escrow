import React, { Component } from 'react';

class TheRock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: false,
      player2: false
    };
    this.setPlayer1ToFalse  = this.setPlayer1ToFalse.bind(this)
    this.setPlayer1ToTrue   = this.setPlayer1ToTrue.bind(this)
    this.setPlayer2ToFalse  = this.setPlayer2ToFalse.bind(this)
    this.setPlayer2ToTrue   = this.setPlayer2ToTrue.bind(this)
  }

setPlayer1ToTrue(){
  this.setState({player1: true});
}
setPlayer1ToFalse(){
  this.setState({player1: false});
}
setPlayer2ToTrue(){
  this.setState({player2: true});
}
setPlayer2ToFalse(){
  this.setState({player2: false});
}

  render () {
    return (
      <div>
        <h1>Welcome, The Rock!</h1>
        <h2>Please enter your verifications for the Candy Asses!</h2>
        <table className="u-full-width">
          <thead>
            <tr>
              <th>Week</th>
              <th>Candy Ass 1</th>
              <th>Candy Ass 2</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><button onClick={this.setPlayer1ToTrue}>True</button></td>
              <td><button onClick={this.setPlayer1ToFalse}>False</button></td>
              <td><button onClick={this.setPlayer2ToTrue}>True</button></td>
              <td><button onClick={this.setPlayer2ToFalse}>False</button></td>
              <td><button onClick={this.props.nextPeriod(this.state.player1, this.state.player2)}>Submit</button></td>
            </tr>
            <tr>
              <td>True/False</td>
              <td>True/False</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default TheRock;
