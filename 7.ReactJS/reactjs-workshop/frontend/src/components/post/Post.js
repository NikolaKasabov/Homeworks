import React from 'react';

import './post-styles.css';

function Post(props) {
  return (
    <div className="Post">
      <img alt="" src={process.env.PUBLIC_URL + '/blue-origami-bird.png'} />
      <p className="description">{props.description}</p>
      <div>
        <span>
          <small>Author:</small>
          {props.author}
        </span>
      </div>
    </div>
  );
}

export default Post;
