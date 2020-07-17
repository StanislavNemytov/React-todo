import React from "react";
import PostListItem from "../post-list-item/post-list-item";
import "./post-list.css";

const PostList = ({
  posts,
  onDelete,
  onToggleImportant,
  onToggleLiked,
  onToggleCompleted,
  onEdit,
  onToggleSelect
}) => {
  return (
    <ul className="app-list list-group">
      {posts.map(item => {
        const { id, ...itemProps } = item;
        return (
          <li key={id} className="list-group-item">
            <PostListItem
              {...itemProps}
              id={id}
              onDelete={onDelete}
              onToggleImportant={onToggleImportant}
              onToggleLiked={onToggleLiked}
              onToggleCompleted={onToggleCompleted}
              onEdit={onEdit}
              onToggleSelect={onToggleSelect}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;
