import React from 'react';
import { InputText } from '../index';

class ListElement extends React.Component{

  handleChange(event) {
    this.props.onChanged(this.props.id);
  }

  handleClick(event) {
    this.props.onDelete(this.props.id);
  }

  handleDoubleClick(event) {
    this.props.onDoubleClicked(this.props.id);
  }

  listenKeyPress(event){
    this.props.onEdit(event,this.props.id);
  }

  decideClass() {
    if(this.props.isChecked) {
      return 'completed'
    }else if(this.props.isEditing) {
      return 'editing';
    }else{
      return '';
    }
  }

  render() {
    const isChecked = this.props.isChecked ? 'checked' : '';
    return(
      <li className={this.decideClass()}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.isChecked}
            onChange={this.handleChange.bind(this)}
          />
          <label
            onDoubleClick={this.handleDoubleClick.bind(this)}
          >
            {this.props.label}
          </label>
          <button
            className="destroy"
            onClick={this.handleClick.bind(this)}
          />
        </div>
        <InputText
          form={this.props.form}
          name={`todo_edit_${this.props.id}`}
          type='edit'
          context={this.props.context}
          onKeyPressed={this.listenKeyPress.bind(this)}
          autofocus
        />
      </li>
    );
  }
}

export default ListElement;
