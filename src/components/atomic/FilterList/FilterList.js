import React from 'react';

class Filter extends React.Component {

  decideClassName() {
    if(this.props.isSelected) {
      return 'selected';
    }else{
      return '';
    }
  }

  handleOnClick() {
    this.props.onClicked(this.props.text);
  }

  render () {
    return (
      <li>
        <a
          className={this.decideClassName()}
          onClick={this.handleOnClick.bind(this)}
        >{this.props.text}</a>
      </li>
    );
  }
}

export default Filter;
