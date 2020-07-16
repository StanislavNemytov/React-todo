import React from "react";
import "./search-panel.css";
import { Component } from "react";

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ""
    };
  }

  handleChange = e => {
    this.setState({ term: e.target.value });
    this.props.onUpdateSearch(e.target.value);
  };

  render() {
    return (
      <input
        className="form-control search-input"
        type="text"
        placeholder="Поиск по записям"
        onChange={this.handleChange}
        value={this.state.term}
      ></input>
    );
  }
}

export default SearchPanel;
