import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <footer className={this.props.style}>
        {this.props.children}
      </footer>
    );
  }
}

export default Footer;
