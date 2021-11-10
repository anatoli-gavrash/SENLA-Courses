import React, { Component } from 'react';
import './sorting.css';
import Buttons from './buttons/buttons.js';
import { Context } from '../../../app-context/app-context.js';

export default class Sorting extends Component {
  getTypeOfSorting = (event) => {
    this.context.searchFilter(event.target.innerText);
  }

  render() {
    return (
      <section className="main__buttons">
        <h2 className="main__title">Sorting tasks</h2>
        <div className="main__buttons-wrapper">
          <Buttons getClick={this.getTypeOfSorting}/>
        </div>
      </section>
    );
  }
}

Sorting.contextType = Context;