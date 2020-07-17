import React, { Component } from "react";
import "./post-list-item.css";

class PostListItem extends Component {
  render() {
    const {
      label,
      onDelete,
      id,
      onToggleImportant,
      onToggleLiked,
      onToggleCompleted,
      like,
      important, completed
    } = this.props;

    let classNames = "app-list-item d-flex justify-content-between";
    important && (classNames += " important");
    like && (classNames += " like");
    completed && (classNames += " completed");

    return (
      <div className={classNames}>
        <span className="app-list-item-label" onClick={() => onToggleLiked(id)}>
          {label}
        </span>
        <div className="d-flex justify-content-center align-items-center">
          <button
            type="button"
            className="btn-star btn-sm"
            onClick={() => onToggleImportant(id)}
          >
            <i className="fa fa-star"></i>
          </button>
          <button
            type="button"
            className="btn-check btn-sm"
            onClick={() => onToggleCompleted(id)}
          >
            <i className="fa fa-check"></i>
          </button>
          <button
            type="button"
            className="btn-trash btn-sm"
            onClick={() => onDelete(id)}
          >
            <i className="fa fa-trash-o"></i>
          </button>
          <i className="fa fa-heart"></i>
        </div>
      </div>
    );
  }
}

export default PostListItem;
