import React from "react";
import PostListItem from "../post-list-item";
import "./post-list.css";

const PostList = ({ posts, onDelete, onToggleImportant, onToggleLiked }) => {
  return (
    <ul className="app-list list-group">
      {posts.map(item => {
        const { id, ...itemProps } = item;
        return (
          <li key={id} className="list-group-item">
            <PostListItem {...itemProps} id={id} onDelete={onDelete} onToggleImportant={onToggleImportant} onToggleLiked={onToggleLiked} />
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
