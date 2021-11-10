import React, { Component } from 'react';
import './search.css';
import magnifier from '../../../../assets/images/svg/icon__magnifier.svg';
import { Context } from '../../../app-context/app-context.js';

export default class Search extends Component {
  state = {
    searchValue: ''
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.searchValue !== prevState.searchValue) {
      this.sendSearchValue();
    }
  }

  searchFieldMonitor = (event) => {
    this.setState((state) => ({ ...state, searchValue: event.target.value }));
  };

  sendSearchValue = () => {
    this.context.getSearchValue(this.state.searchValue.toLowerCase());
  };
  
  render() {
    return (
      <form className="header__form" id="id-search-form">
        <img className="header__search-image" src={magnifier} alt="Декоративная лупа в поле поиска"/>
        <input className="header__search-field"
          type="search"
          placeholder="Search by tasks"
          onChange={this.searchFieldMonitor}
          value={this.state.searchValue}/>
      </form>
    );
  }
}

Search.contextType = Context;