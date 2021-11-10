import React, { Component } from 'react';
import './button-mark.css';
import { Context } from '../../../../../../app-context/app-context.js';

export default class ButtonMark extends Component {
  displayButton = () => {
    const { importantButtonText, changeImportant } = this.props;
    const currentSortType = this.context.state.sorting.type;
    let classNames = 'tasks__button-important';

    if (currentSortType === 'Done') {
      classNames += ' important-display-none'
    }
    
    return (
      <button className={classNames} onClick={changeImportant}>{importantButtonText}</button>
    );
  };

  render() {
    return this.displayButton();
  }
}

ButtonMark.contextType = Context;