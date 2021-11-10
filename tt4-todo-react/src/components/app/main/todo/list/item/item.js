import React, { Component } from 'react';
import './item.css';
import ButtonCrossOut from './button-cross-out/button-cross-out.js';
import ButtonMark from './button-mark/button-mark.js';
import ButtonDelete from './button-delete/button-delete.js';
import { Context } from '../../../../../app-context/app-context.js';

export default class TodoListItem extends Component {
  createListItems = () => {
    const todoListItems = this.context.state.todoListItems;

    return todoListItems.map((item) => {
      const {id, description, completed, important, visibility} = item;
      
      let classNames = 'tasks__items';
      let importantButtonText = 'mark important';
      
      if(completed) classNames += ' complete';
      if(important) {
        classNames += ' important';
        importantButtonText = 'not important';
      }
      if(!visibility) classNames += ' display-none';

      return (
        <li className={classNames} tabIndex="0" key={id}>
          <ButtonCrossOut 
            description={description}
            crossOutTrigger={() => this.crossOutTrigger(id)}
          />
          <ButtonMark 
            importantButtonText={importantButtonText}
            changeImportant={() => this.markImportant(id)}
          />
          <ButtonDelete deletingItem={() => this.deleteItem(id)}/>
        </li>
      );
    });
  };

  crossOutTrigger = (id) => {
    const newState = {
      todoListItems: this.context.state.todoListItems.map(
        (element) => {
          if(element.id === id) {
            element.completed = !element.completed;
          }

          return element;
        }
      )
    };

    this.context.updateState(newState);
  }

  markImportant = (id) => {
    const newState = {
      todoListItems: this.context.state.todoListItems.map(
        (element) => {
          if(element.id === id) {
            element.important = !element.important;
          }

          return element;
        }
      )
    };

    this.context.updateState(newState);
  };

  deleteItem = (id) => {
    const newState = {
      todoListItems: this.context.state.todoListItems.filter(
        (element) => element.id !== id
      )
    };
    
    this.context.updateState(newState);
  };

  render() {
    return (
      this.createListItems()
    );
  }
}

TodoListItem.contextType = Context;