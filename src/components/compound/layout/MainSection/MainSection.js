import React from 'react';
import connect from 'soya/lib/data/redux/connect';
import TodoSegment from '../../../../segments/TodoSegment';

class MainSection extends React.Component {

  static getSegmentDependencies() {
    return [TodoSegment];
  }

  static subscribeQueries(props, subscribe){
    subscribe(TodoSegment.id(),'todos','todo_list');
  }

  handleClick(){
    console.log("test");
    const todostore = this.props.context.store;
    const ACTION_CREATOR = TodoSegment.getActionCreator();
    if(this.props.result.todo_list){
      const todo_list = this.props.result.todo_list;
      const completed = this.filterTodos(true);
      let toBeToggled = [];
      if(completed.length == todo_list.length) {
        // if everything is complete, then toggle everything back to inComplete
        toBeToggled = todo_list;
      }else{
        // if some of them are incomplete, then only toggle the uncomplete one
        toBeToggled = this.filterTodos(false);
      }

      for (var i = 0; i < toBeToggled.length; i++) {
        todostore.dispatch(ACTION_CREATOR.toggleTodo(toBeToggled[i].id));
      }
    }
  }



  filterTodos(byComplete){
    const todos = this.props.result.todo_list.filter((todo)=>{
      if(byComplete){
        return todo.isCompleted;
      }else{
        return !todo.isCompleted;
      }
    });
    return todos;
  }

  render() {
    return(
      <section className="main">
        <input
          className="toggle-all"
          type="checkbox"
          onClick={this.handleClick.bind(this)}
        />
        <label for="toggle-all" onClick={this.handleClick.bind(this)}>Mark all as complete</label>
        {this.props.children}
      </section>
    );
  }
}

export default connect(MainSection);
