import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/dayjs";
import { useField } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import * as dayjs from "dayjs";
const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  small: {
    width: 150,
  },
}));
const MyDatePicker = ({ variant, format, label, size, width, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const classes = useStyles();
  const { setValue } = helpers;
  const errorText =
    meta.error && meta.touched && !meta.initialTouched ? meta.error : "";
  const { value } = meta;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        className={ `${classes.root} ${width === "small" ? classes.small :""}`}
        name={field.name}
        error={!!errorText}
        //better error message
        helperText={
          errorText !== ""
            ? errorText === "Required"
              ? "Required"
              : "Invalid Date"
            : ""
        }
        value={value}
        onChange={(date) => {
          setValue(dayjs(date));
        }}
        variant={variant}
        format={format}
        label={label}
        size={size}
      />
    </MuiPickersUtilsProvider>
  );
};

export default MyDatePicker;
