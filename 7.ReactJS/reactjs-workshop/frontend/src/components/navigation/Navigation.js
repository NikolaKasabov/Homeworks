import React, { Component } from 'react';
import './navigation-styles.css';

import Link from '../link/Link';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      linksNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    }
  }

  render() {
    return (
      <nav className="Navigation">
        <ul>
          <li className="listItem"><img src={process.env.PUBLIC_URL + '/white-origami-bird.png'} /></li>
          {this.state.linksNumber.map((number) => <Link key={number} number={number} />)}
        </ul>
      </nav>
    )
  }
}

export default Navigation;
