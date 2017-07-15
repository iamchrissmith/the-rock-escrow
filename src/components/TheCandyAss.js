import React, { Component } from 'react';

class TheCandyAss extends Component {
  render () {
    return (
      <div>
        <h1>Welcome, Candy Ass!</h1>
        <p>Candy Ass 1 has failed: {this.props.getFailureCounts()[0].toNumber()} Times</p>
        <p>Candy Ass 2 has failed: {this.props.getFailureCounts()[1].toNumber()} Times</p>
        <p>You have donated Z dollars to Charity</p>
        <p>You have both worked out A number of weeks.</p>
        <p>You have B number of weeks left and C ETH at stake.</p>
      </div>
    );
  }
}

export default TheCandyAss;
