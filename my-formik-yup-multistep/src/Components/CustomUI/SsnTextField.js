import { TextField } from "@material-ui/core";
import InputMask from "react-input-mask";
import { useField, Field } from "formik";

const SsnTextField = ({ placeholder, ...props }) => {
  const [, meta, helpers] = useField(props);
  const errorText =
    meta.error && meta.touched && !meta.initialTouched ? meta.error : "";
  const { value } = meta;
  const { setValue } = helpers;
  return (
    <InputMask
      mask="999-99-9999"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      disabled={false}
      maskChar=" "
    >
      {() => (
        <Field
          component={TextField}
          variant="outlined"
          label={placeholder}
          helperText={errorText}
          error={!!errorText}
        />
      )}
    </InputMask>
  );
};

export default SsnTextField;
