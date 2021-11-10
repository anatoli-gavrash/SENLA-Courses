import React, { Component } from 'react';
import './main.css';
import Sorting from './sorting/sorting.js';
import Todo from './todo/todo.js';

export default class Main extends Component {
  
  render() {
    return (
      <main className="main">
        <Sorting />
        <Todo />
      </main>
    );
  }
}