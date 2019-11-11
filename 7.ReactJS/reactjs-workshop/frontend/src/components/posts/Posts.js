import React, { Component } from 'react';
import './posts-styles.css';

import Post from '../post/Post';

class Posts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    fetch('http://localhost:9999/api/origami')
      .then((readableStream) => readableStream.json())
      .then((json) => this.setState({posts: json}))
      .catch((err) => console.log(err));
  }

  render() {

    return (
      <div className="Posts">
        {this.state.posts.map((post) => <Post description={post.description} author={post.author}/>)}
      </div>
    );
  }
}

export default Posts;
