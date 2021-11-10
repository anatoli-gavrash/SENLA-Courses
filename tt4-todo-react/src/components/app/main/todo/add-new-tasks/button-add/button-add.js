import React, { Component } from 'react';
import './button-add.css';

export default class ButtonAdd extends Component {
  render() {
    const { textareaValue, buttonAddClick } = this.props;
    let classNames = 'form__add-button';

    if(!textareaValue) classNames += ' disabled'; 

    return (
      <button className={classNames}
        type="button" 
        onClick={buttonAddClick}
      >add</button>
    );
  }
}