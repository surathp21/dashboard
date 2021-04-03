import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@material-ui/core";
import React from "react";

function Select(props) {
  const { name, label, value, onChange, options, error = null } = props;
  return (
    <FormControl
      variant="outlined"
      {...(error && { error: true })}
      style={{ width: "280px" }}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}

export default Select;
