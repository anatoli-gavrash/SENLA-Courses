import React, { Component } from 'react';
import './buttons.css';
import { Context } from '../../../../app-context/app-context.js';

export default class Buttons extends Component {
  createButtons = () => {
    const currentSortType = this.context.state.sorting.type;
    const { getClick } = this.props;
    const buttonNames = ['All', 'Active', 'Done'];
    
    return buttonNames.map((buttonName, index) => {
      let classNames = 'main__button';

      if (currentSortType === buttonName) {
        classNames += ' active';
      }

      return (
      <button className={classNames} key={'sb' + index + 1} onClick={getClick}>{buttonName}</button>
      );
    });
  };
  
  render() {
    return this.createButtons();
  }
}

Buttons.contextType = Context;