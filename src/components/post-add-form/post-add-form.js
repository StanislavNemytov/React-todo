import React, { Component } from "react";
import "./post-add-form.css";

class PostAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  addItem = event => {
    event.preventDefault();

    this.state.value.trim() && this.props.onAdd(this.state.value);
    this.setState({ value: "" });
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <form className="bottom-panel d-flex" onSubmit={this.addItem}>
        <input
          type="text"
          placeholder="О чем вы думаете?"
          className="form-control new-post-label"
          name="body"
          value={this.state.value}
          onChange={this.handleChange}
          autoComplete="off"
        />
        <input
          className={`btn btn-primary ${!this.state.value && "disabled"}`}
          type="submit"
          value="Добавить"
        />
      </form>
    );
  }
}

export default PostAddForm;
