import React from "react";

class CheckBox extends React.Component {
  render() {
    const { id, title, name, handleChange, checked } = this.props;

    return (
      <div>
        <input
          id={id}
          type="checkbox"
          name={name}
          onChange={handleChange}
          checked={checked}
        />
        <label htmlFor={id}>{title}</label>
      </div>
    );
  }
}

export default CheckBox;