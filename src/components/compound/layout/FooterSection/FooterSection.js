import React from 'react';
import connect from 'soya/lib/data/redux/connect';

import FilterWrapper from '../FilterWrapper/FilterWrapper';
import TodoSegment from '../../../../segments/TodoSegment';

class FooterSection extends React.Component {

  static connectId(){
    return 'FooterSection';
  }

  static getSegmentDependencies() {
    return [TodoSegment];
  }

  static subscribeQueries(props, subscribe) {
    subscribe(TodoSegment.id(), "todos", "todo_list");
    subscribe(TodoSegment.id(), "filter_iscomplete", "filter_iscomplete");
  }

  findItemLeft() {
    if(this.props.result.todo_list){
      return this.props.result.todo_list.filter((todo)=>{return !todo.isCompleted}).length;
    }else{
      return -1;
    }
  }

  clearCompleted() {
    const todostore = this.props.context.store;
    const ACTION_CREATOR = TodoSegment.getActionCreator();
    const notCompleted = this.findNotCompleted();
    todostore.dispatch(ACTION_CREATOR.setTodo(notCompleted));
  }

  findNotCompleted(){
    const todo_list = this.props.result.todo_list;
    const notComplete = todo_list.filter((todo)=>{
      return !todo.isCompleted;
    });
    return notComplete;
  }

  renderClearCompleted(){
      // render only if there's completed todo
      if(this.countCompleted() > 0){
        return (
          <button
            className="clear-completed"
            onClick={this.clearCompleted.bind(this)}
          >
            Clear completed
          </button>
        );
      }
  }

  countCompleted() {
    const todo_list = this.props.result.todo_list;
    const notComplete = todo_list.filter((todo)=>{
      return todo.isCompleted;
    });
    return notComplete.length;
  }

  render() {
    if(this.props.result.todo_list != null) {
      console.log("kepanggil");
      return(
        <div>
          <span className="todo-count">
            <strong>{this.findItemLeft()}</strong> item left
          </span>
          <FilterWrapper context={this.props.context}/>
          {this.renderClearCompleted()}
        </div>
      );
    }else{
      return <div/>
    }
  }
}

export default connect(FooterSection);
