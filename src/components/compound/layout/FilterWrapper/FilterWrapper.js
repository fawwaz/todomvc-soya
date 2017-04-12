import React from 'react';
import connect from 'soya/lib/data/redux/connect';
import {
  FilterList
} from '../../../atomic';
import TodoSegment from '../../../../segments/TodoSegment';

class FilterWrapper extends React.Component {

  constructor(props) {
    super(props);
    this.filter_lists = ['All','Active','Completed'];
  }

  static getSegmentDependencies() {
    return [TodoSegment];
  }

  static subscribeQueries(props, subscribe){
    subscribe(TodoSegment.id(), 'todos', 'todo_list');
    subscribe(TodoSegment.id(), 'filter_iscomplete', 'filter');
  }

  handleClick(text){
    const todostore = this.props.context.store;
    const ACTION_CREATOR = TodoSegment.getActionCreator();
    todostore.dispatch(ACTION_CREATOR.filterBy(text));
  }

  render() {
    if(this.props.result){
      const list_filter = this.filter_lists.map((filter_text) => {
        return (
          <FilterList
            text={filter_text}
            onClicked={this.handleClick.bind(this)}
            isSelected={filter_text == this.props.result.filter}
          />
        );
      });

      return (
        <ul className="filters">
          {
              list_filter
          }
        </ul>
      );
    }else{
      return <div />
    }

  }
}

export default connect(FilterWrapper);
