import React, { Component } from 'react';
import './aside-styles.css';

import Link from '../link/Link';

class Aside extends Component {
  constructor(props) {
    super(props);

    this.state = {
      linksNumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    }
  }

  render() {
    return (
      <aside className="Aside">
        <ul>
          {this.state.linksNumber.map((number) => <Link key={number} number={number} />)}
        </ul>
      </aside>
    )
  }
}

export default Aside;
