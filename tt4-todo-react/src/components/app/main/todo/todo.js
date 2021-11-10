import React, { Component } from 'react';
import './todo.css';
import AddNewTask from './add-new-tasks/add-new-task.js';
import TodoList from './list/list.js';

export default class Todo extends Component {
  
  render() {
    return (
      <section className="main__tasks tasks">
        <h2 className="tasks__title">Task list</h2>
        <AddNewTask />
        <TodoList />
      </section>
    );
  }
}