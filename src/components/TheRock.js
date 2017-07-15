import React, { Component } from 'react';

class TheRock extends Component {
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
              <td>True</td>
              <td>Selected: False</td>
              <td>-50</td>
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
