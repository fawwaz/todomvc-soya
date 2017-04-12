import React from 'react';
import createField from 'soya/lib/data/redux/form/createField';

class InputText extends React.Component {
  static get TYPE(){
    return{
      NEW : 'new-todo',
      EDIT : 'edit'
    }
  }

  handleChange(event) {
    this.props.handleChange(event.target.value, event);
    this.props.onInputChange(event);
  }

  handleKeyPress(event) {
    this.props.onKeyPressed(event);
  }

  render() {
    return (
      <input
        className={this.props.type}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={this.handleChange.bind(this)}
        onKeyDown={this.handleKeyPress.bind(this)}
      />
    );
  }
}

export default createField(InputText);
