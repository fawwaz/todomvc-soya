import React from 'react';
import connect from 'soya/lib/data/redux/connect';

import {
  ListElement
}from '../../../atomic';
import TodoSegment from '../../../../segments/TodoSegment';
import FormSegment from 'soya/lib/data/redux/form/FormSegment';

const FORM_ID = `todo_form`;
const ENTER_KEY_CODE = 13;
const ESCAPE_KEY_CODE = 27;

class TodoWrapper extends React.Component {

  static getSegmentDependencies() {
    return [TodoSegment];
  }

  static subscribeQueries(props, subscribe) {
    subscribe(TodoSegment.id(), "todos", "todo_list");
    subscribe(TodoSegment.id(), "filter_iscomplete", "filter_iscomplete");
    subscribe(TodoSegment.id(), "editing","editing_id");
  }

  handleChangeElement(id) {
    const todostore = this.props.context.store;
    const ACTION_CREATOR = TodoSegment.getActionCreator();
    todostore.dispatch(ACTION_CREATOR.toggleTodo(id));
  }

  handleDeleteElement(id) {
    // find the index of related id
    const idx = this.findIndexofIdTodo(id);
    const todostore = this.props.context.store;
    const ACTION_CREATOR = TodoSegment.getActionCreator();
    todostore.dispatch(ACTION_CREATOR.deleteTodo(idx));
  }

  handleOnInputchange(event) {
    console.log("input changed");
  }

  handleKeyPressed(event) {
    console.log("key pressed");
  }

  handleDoubleClicked(id) {
    const todostore = this.props.context.store;
    const ACTION_CREATOR = TodoSegment.getActionCreator();
    todostore.dispatch(ACTION_CREATOR.editTodo(id));
  }

  handleEdit(event,id){
    if( event.keyCode === ENTER_KEY_CODE ) {
      this.saveToStore(id);
    }else if( event.keyCode === ESCAPE_KEY_CODE ){
      this.discardChange();
    }
  }

  findIndexofIdTodo(id) {
    let idx = 0;
    const todo_list = this.props.result.todo_list;
    for (var i = 0; i < todo_list.length; i++) {
      if(todo_list[i].id == id){
        idx = i;
      }
    }
    return idx;
  }

  saveToStore(id) {
    const todostore = this.props.context.store;
    const ACTION_CREATOR = TodoSegment.getActionCreator();
    const idx = this.findIndexofIdTodo(id);
    console.log(id);

    const promise = todostore.query(FormSegment.id(), {
      formId: FORM_ID,
      type: 'field',
      fieldName: `todo_edit_${id}`
    }).then((edittedText) => {
      console.log(edittedText);
      console.log(id);
      const edittedTodo = {
        id: id,
        text: edittedText.value,
        isComplete: false
      };

      todostore.dispatch(ACTION_CREATOR.updateTodo(idx,edittedTodo))
        .then(()=>{
          todostore.dispatch(ACTION_CREATOR.editTodo(-1));
        });

    });
  }

  discardChange(){
    const todostore = this.props.context.store;
    const ACTION_CREATOR = TodoSegment.getActionCreator();
    todostore.dispatch(ACTION_CREATOR.editTodo(-1));
  }

  decideShouldRenderOrNot(listElement){
    const filter_iscomplete_value = this.props.result.filter_iscomplete;
    console.log(filter_iscomplete_value);
    console.log(listElement.isComplete);
    if((filter_iscomplete_value == 'Active') && (listElement.isCompleted == false)){
      return true;
    }else if((filter_iscomplete_value == 'Completed') && (listElement.isCompleted == true)){
      return true;
    }else if(filter_iscomplete_value == 'All'){
      return true;
    }else {
      return false;
    }
  }

  renderListElement(element,isedit){
    if(this.decideShouldRenderOrNot(element)){
      return (
        <ListElement
          form={this.props.form}
          id={element.id}
          label={element.text}
          isChecked={element.isCompleted}
          onChanged={this.handleChangeElement.bind(this)}
          onDelete={this.handleDeleteElement.bind(this)}
          context={this.props.context}
          isEditing={isedit}
          onEdit={this.handleEdit.bind(this)}
          onDoubleClicked={this.handleDoubleClicked.bind(this)}
        />
      );
    }
  }

  render() {
    if (this.props.result.todo_list  && this.props.result.filter_iscomplete){
      const todolist = this.props.result.todo_list.map((element)=>{
        const isedit = this.props.result.editing_id == element.id;
        return (
          <div>
            {this.renderListElement(element,isedit)}
          </div>
        );
      });

      return(
        <ul className="todo-list">
          {
            todolist
          }
        </ul>
      );
    }else{
      return <div> empty </div>
    }
  }
}

export default connect(TodoWrapper);
