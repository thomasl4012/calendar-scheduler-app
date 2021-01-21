import React from "react";
import TextField from "@material-ui/core/TextField";

export default function inputs(props) {
  ({ name, label, error, onChange } = props);
  return (
    <TextField
      id="outlined-text-input"
      label={label}
      type="text"
      variant="outlined"
      value={value}
      onChange={onChange}
      name={name}
      {...(error && {
        error: true,
        label: this.state.errors.firstName,
        variant: "outlined",
        id: "outlined-error-helper-text",
        defaultValue: this.state.errors.firstName,
      })}
    />
  );
}
