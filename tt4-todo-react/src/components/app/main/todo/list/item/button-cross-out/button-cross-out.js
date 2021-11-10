import React, { Component } from 'react';
import './button-cross-out.css';

export default class ButtonCrossOut extends Component {
  render() {
    const { description, crossOutTrigger } = this.props;

    return (
      <p className="tasks__text" title={description} onClick={crossOutTrigger}><span className="tasks__star">&#9734;</span>{description}</p>
    );
  }
}