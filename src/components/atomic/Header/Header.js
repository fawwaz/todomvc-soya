import React from 'react';

class Header extends React.Component {
  render() {
    return(
      <header clasName="header">
        <h1>{this.props.text}</h1>
        {this.props.children}
      </header>
    );
  }
}

export default Header;
