import React, { Component } from 'react';
import './button-delete.css';

export default class ButtonDelete extends Component {
  render() {
    const { deletingItem } = this.props;
    
    return (
      <button className="tasks__button-delete" onClick={deletingItem}></button>
    );
  }
}