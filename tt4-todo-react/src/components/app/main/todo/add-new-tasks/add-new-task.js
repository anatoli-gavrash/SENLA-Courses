import React, { Component } from 'react';
import './add-new-task.css';
import ButtonAdd from './button-add/button-add.js';
import { Context } from '../../../../app-context/app-context.js'

export default class AddNewTask extends Component {
  state = {
    textareaValue: ''
  };
  
  textareaMonitor = (event) => {
    this.setState((state) => ({ ...state, textareaValue: event.target.value }));
  };
  
  sendTaskText = () => {    
    if (this.state.textareaValue) {
      this.getTextareaValue();
      this.clearField();
    }
  };

  getTextareaValue = () => {
    this.context.newTodoText(this.state.textareaValue.trim());
  };

  clearField = () => {
    this.setState((state) => ({ ...state, textareaValue: '' }));
  };

  render() {
    return (
      <form className="tasks__form form">
        <label className="form__label" htmlFor="id-enter-task">New Task</label>
        <textarea className="form__textarea" 
          name="enter-task" 
          id="id-enter-task" 
          value={this.state.textareaValue}
          onChange={this.textareaMonitor}
        ></textarea>
        <ButtonAdd 
          textareaValue={this.state.textareaValue}
          buttonAddClick={() => this.sendTaskText()}
        />
      </form>
    );
  }
}

AddNewTask.contextType = Context;