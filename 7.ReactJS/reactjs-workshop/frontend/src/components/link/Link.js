import React from 'react';
import './link-styles.css';

function Link(props) {
  return (
    <li className='listItem'>
      <a href={'/' + props.number}>Going to {props.number}</a>
    </li>
  );
}

export default Link;
