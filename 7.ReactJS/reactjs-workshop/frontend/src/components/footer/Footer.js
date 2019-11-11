import React, { Component } from 'react';
import './footer-styles.css';

import Link from '../link/Link';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      linksNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    }
  }

  render() {
    return (
      <footer className="Footer">
        <ul>
          {this.state.linksNumber.map((number) => <Link key={number} number={number} />)}
          <li className="listItem"><img alt="" src={process.env.PUBLIC_URL + '/blue-origami-bird-flipped.png'} /></li>
        </ul>
        <p>Software University &copy; 2019</p>
      </footer>
    )
  }
}

export default Footer;
