import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Context } from '../app-context/app-context.js';
import Header from './header/header.js';
import Main from './main/main.js';
import './app.css';
import backgroundImage from '../../assets/images/svg/taking__notes.svg';

export default class App extends Component {
  state = {
    sorting: {
      value: '',
      type: 'All'
    },
    todoListItems: localStorage.getItem('todoListItems') ?
                   JSON.parse(localStorage.getItem('todoListItems')).map((element) => {
                     element.visibility = 'true';
                     return element;
                   }) :
                   []
  };

  getSearchValue = (sortingValue) => {
    this.setState((state) => ({ ...state, sorting: { ...state.sorting, value: sortingValue }}));
    this.sorting();
  };

  getSortingType = (sortingType) => {
    this.setState((state) => ({ ...state, sorting: { ...state.sorting, type: sortingType }}));
    this.sorting();
  };

  sorting = () => {
    this.setState((state) => {
      return {
        ...state,
        todoListItems: [
          ...state.todoListItems.map((element) => {
            if (
                this.searchValue(element.description, state.sorting.value)
                && this.searchType(element.completed, state.sorting.type)
              )
            {
              element.visibility = true;
            } else {
              element.visibility = false;
            }
            
            return element;
          })
        ]
      };
    });
  }

  searchValue = (description, value) => {
    return description.toLowerCase().indexOf(value) !== -1;
  };
  
  searchType = (completed, type) => {
    if (type === 'All') {
      return true;
    } 
    
    const isType = type === 'Done';
    
    return completed === isType;
  };

  createTodoListItem = (todoItemDescription) => {
    this.setState((state) => { 
      return {
        ...state,
        todoListItems: [
          {
            id: nanoid(),
            description: todoItemDescription,
            completed: false,
            important: false,
            visibility: true
          },
          ...state.todoListItems
        ]
      }
    });
  };

  updateState = (newState) => {
    this.setState(() => newState);
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.todoListItems !== prevState.todoListItems) {
      localStorage.setItem('todoListItems', JSON.stringify(this.state.todoListItems));
    }
  };
  
  render() {
    const { todoListItems } = this.state;
    
    return (
      <Context.Provider value={{
        state: this.state,
        updateState: (newState) => this.updateState(newState),
        getSearchValue: (searchValue) => this.getSearchValue(searchValue),
        searchFilter: (filterType) => this.getSortingType(filterType),
        newTodoText: (newText) => this.createTodoListItem(newText)
      }}>
        <div>
          <img className="background-image"
              src={backgroundImage}
              alt="Мужчина в светло-синем костюме вешает заметку на импровизированную стену задач."/>       
          <Header todoList={todoListItems}/>
          <Main />
        </div>
      </Context.Provider>
    );
  }
}

