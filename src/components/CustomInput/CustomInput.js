import { TextField } from "@material-ui/core";
import React from "react";

export default function CustomInput(props) {
  const { name, label, value, onChange, error = null } = props;
  return (
    <TextField
      variant="outlined"
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
      style={{ width: "280px" }}
    ></TextField>
  );
}
