import React, { Component } from 'react';
import './header.css';
import senlaLogo from '../../../assets/images/svg/senla-logo.svg';
import HeaderSearch from './search/search.js';

export default class Header extends Component {
  render() {
    
    return (
      <header className="header">
        <h1 className="header__title">SENLA. Tasks for everyone</h1>
        <img className="header__logo" src={senlaLogo} alt="Логотип компании SENLA"/>
        <HeaderSearch />
      </header>
    );
  }
}