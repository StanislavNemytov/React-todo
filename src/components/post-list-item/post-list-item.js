import React, { Component } from "react";
import "./post-list-item.css";
import EditItem from "../editItem/editItem";

class PostListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.label,
      edit: false
    };
  }

  editItem = () => {
    this.setState(({ edit }) => ({ edit: !edit }));
  };

  setNewValue = newValue => {
    this.editItem();
    this.setState({ value: newValue });
  };

  render() {
    const {
      onDelete,
      id,
      onToggleImportant,
      onToggleCompleted,
      like,
      important,
      onToggleLiked,
      completed,
      selected,
      onToggleSelect
    } = this.props;

    let classNames = "app-list-item d-flex justify-content-between";
    important && (classNames += " important");
    like && (classNames += " like");
    completed && (classNames += " completed");

    const currentState = this.state.edit ? (
      <EditItem value={this.state.value} setNewValue={this.setNewValue} />
    ) : (
      <ItemText
        editItem={this.editItem}
        state={this.state}
        id={id}
        selected={selected}
        onToggleSelect={onToggleSelect}
      />
    );

    return (
      <div className={classNames}>
        {currentState}

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

          <button
            type="button"
            className="btn-heart btn-sm"
            onClick={() => onToggleLiked(id)}
          >
            <i className="fa fa-heart"></i>
          </button>
        </div>
      </div>
    );
  }
}

const ItemText = ({ editItem, state, id, selected, onToggleSelect }) => {
  const { value } = state;

  return (
    <div className="d-flex label">
      <input
        className="checkbox"
        type="checkbox"
        name="selected"
        id={id}
        checked={selected}
        onChange={() => onToggleSelect(id)}
      />
      <span className="app-list-item-label">{value}</span>
      <button
        type="button"
        className="btn-pencil btn-sm ml-3"
        onClick={e => editItem(e, value)}
      >
        <i className="fa fa-pencil"></i>
      </button>
    </div>
  );
};

export default PostListItem;
