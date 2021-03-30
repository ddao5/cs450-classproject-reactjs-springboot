import { useField } from "formik";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    width: 160,
  },
  small: {
    width: 100,
  },
}));

const MySelectField = ({ items, placeholder, size, width, ...props }) => {
  const classes = useStyles();
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched && !meta.initialTouched ? meta.error : "";
  return (
    <FormControl
      error={!!errorText}
      variant="outlined"
      className={`${classes.root} ${width === "small" ? classes.small : ""}`}
      size={size}
    >
      <InputLabel htmlFor="select">{placeholder}</InputLabel>
      <Select
        {...field}
        inputProps={{ variant: "outlined" }}
        labelWidth={width === "small" ? 60 : 120}
        id="select"
      >
        {items.map((item) => (
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
};

export default MySelectField;
