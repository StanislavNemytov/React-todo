import React from "react";
import { Component } from "react";

class EditItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    };
    this.textInput = React.createRef();
  }

  componentDidMount = () => {
    this.textInput.current.focus();
  };

  onEdited = e => {
    e.preventDefault();
    this.props.setNewValue(this.state.value);
  };

  render() {
    const { value } = this.state;
    return (
      <form className="edit-form d-flex" onBlur={this.onEdited} onSubmit={this.onEdited}>
        <div className="input-group">
          <input
            className="form-control"
            ref={this.textInput}
            type="text"
            onChange={e => this.setState({ value: e.target.value })}
            value={value}
          />
          <button
            ref={this.props.forwardRef}
            type="submit"
            className="btn btn-primary submit"
          >
            Применить
          </button>
        </div>
      </form>
    );
  }
}

export default EditItem;
