import React, { Component } from "react";
import "./post-status-filter.css";

class PostStatusFilter extends Component {
  constructor(props) {
    super(props);
    this.buttons = [
      { name: "all", label: "Все" },
      { name: "like", label: "Понравилось" },
      { name: "completed", label: "Выполнено" }
    ];
  }
  render() {
    const buttons = this.buttons.map(({ name, label }) => {
      const { filter, onFilterSelect } = this.props;
      const activeClass = filter === name ? "info" : "outline-secondary";
      return (
        <button
          key={name}
          className={`btn btn-${activeClass}`}
          onClick={() => onFilterSelect(name)}
        >
          {label}
        </button>
      );
    });
    return <div className="btn-group">{buttons}</div>;
  }
}
export default PostStatusFilter;
