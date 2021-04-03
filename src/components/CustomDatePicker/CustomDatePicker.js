import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const CustomDatePicker = (props) => {
  const { name, label, value, onChange } = props;
  const convertDefaultEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        autoOk
        variant="inline"
        inputVariant="outlined"
        name={name}
        label={label}
        format="yyyy-MM-dd"
        value={value}
        onChange={(date) => onChange(convertDefaultEventPara(name, date))}
        style={{ width: "280px" }}
      />
    </MuiPickersUtilsProvider>
  );
};

export default CustomDatePicker;
