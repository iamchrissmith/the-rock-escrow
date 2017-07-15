import React, { Component } from 'react';
import Result from './Result'

const TheCandyAss = ({results}) =>
  <table>
    <thead>
      <tr>
        <th>CandyAss 1</th>
        <th>CandyAss 2</th>
      </tr>
    </thead>
    <tbody>
    {results}
    </tbody>
  </table>


export default TheCandyAss;
