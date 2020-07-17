import React, { Component } from "react";
import "./post-highlight.scss";

class HighlightPost extends Component {
  render() {
    const {
      onToggleSelectAll,
      highlightedAll,
      selectedPosts,
      removeSelectedPosts,
      posts
    } = this.props;
    const button = highlightedAll ? (
      <button
        className="highlight-btn highlightOne btn btn-link"
        onClick={() => onToggleSelectAll(posts)}
      >
        Снять выделение
      </button>
    ) : (
      <button
        className="highlight-btn highlightAll btn btn-link"
        onClick={() => onToggleSelectAll(posts)}
      >
        Выделить все
      </button>
    );
    const deletePosts = selectedPosts ? (
      <button
        className="delete-selected-posts btn btn-link text-danger"
        onClick={() => removeSelectedPosts(posts)}
      >
        <i className="fa fa-trash-o mr-2 text-danger"></i>
        Удалить выделенное
      </button>
    ) : null;

    return (
      <>
        {posts.length !== 0 && button}
        {deletePosts}
      </>
    );
  }
}

export default HighlightPost;
