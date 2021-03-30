import { useField } from "formik";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  small: {
    width: "10ch",
  },
  textField: {
      marginLeft: theme.spacing(1),
      marignRight: theme.spacing(1),
  }
}));

const MyTextField = ({ placeholder, type, inputProps, width, size, variant, ...props }) => {
  const classes = useStyles();
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched && !meta.initialTouched ? meta.error : "";
  return (
    <TextField
      {...field}
      className={`${classes.textField} ${ width === "small" ? classes.small: ""}`}
      size={size}
      helperText={errorText}
      label={placeholder}
      error={!!errorText}
      variant={variant}
      inputProps={inputProps}
      type={type}
    />
  );
};

export default MyTextField;
