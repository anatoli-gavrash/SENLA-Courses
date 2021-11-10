import React, { Component } from 'react';
import './list.css';
import TodoListItem from './item/item.js';

export default class TodoList extends Component {

  render() {
    return (
      <ul className="tasks__list">
        <TodoListItem />
      </ul>
    );
  }
}