import { FieldArray, useField } from "formik";
import {
  Box,
  Grid,
  IconButton,
  FormHelperText,
  FormControlLabel,
  Typography,
  Divider,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons/";
import MyTextField from "./CustomUI/MyTextField";
import MySelectField from "./CustomUI/MySelectField";
import MyDatePicker from "./CustomUI/MyDatePicker";
const Dependents = (props) => {
  const [field, meta] = useField({ name: "dependents" });
  const addHandler = (arrayHelpers) => {
    arrayHelpers.push({
      dependentName: "",
      sex: "",
      bDate: null,
      relationship: "",
    });
  };
  const deleteHandler = (arrayHelpers, index) => {
    arrayHelpers.remove(index);
    if (meta.value.length === 1) {
      props.changedHasDependent(false, meta);
    }
  };
  const isNewest = (index) => {
    return index === field.value.length - 1;
  };
  const dialog = (
    <Box paddingBottom={2}>
      <Typography align="center" variant="overline" display="block">
        Does a new employee have any dependent?
      </Typography>
      <Divider />
      <Box display="flex" justifyContent="center">
        <RadioGroup
          value={props.hasDependent}
          onChange={(event) =>
            props.changedHasDependent(event.target.value, meta)
          }
          row
        >
          <FormControlLabel control={<Radio />} label="YES" value={true} />
          <FormControlLabel control={<Radio />} label="NO" value={false} />
        </RadioGroup>
      </Box>
    </Box>
  );
  return (
    <div>
      {!props.hasDependent ? (
        dialog
      ) : (
        <FieldArray {...field}>
          {(arrayHelpers) => (
            <Box>
              {meta.value.map((dependent, index) => (
                <Grid container key={index}>
                  <Grid item>
                    <MyTextField
                      name={`dependents[${index}].dependentName`}
                      placeholder="Name"
                      type="text"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item>
                    <MySelectField
                      name={`dependents[${index}].sex`}
                      items={["F", "M"]}
                      placeholder="Gender"
                      width="small"
                    />
                  </Grid>
                  <Grid item>
                    <MyDatePicker
                      variant="inline"
                      format="DD-MM-YYYY"
                      disabled={false}
                      label="Birthday"
                      name={`dependents[${index}].bDate`}
                    />
                  </Grid>
                  <Grid item>
                    <MySelectField
                      name={`dependents[${index}].relationship`}
                      items={["Spouse", "Son", "Daughter"]}
                      placeholder="Relationship"
                    />
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={(index) => deleteHandler(arrayHelpers, index)}
                    >
                      <Delete />
                    </IconButton>
                    {isNewest(index) ? (
                      <IconButton
                        onClick={() => addHandler(arrayHelpers)}
                        aria-label="add"
                      >
                        <Add />
                      </IconButton>
                    ) : null}
                  </Grid>
                </Grid>
              ))}
              {typeof meta.error === "string" && meta.touched ? (
                <FormHelperText style={{ marginLeft: "0.5rem" }} error>
                  {meta.error}
                </FormHelperText>
              ) : null}
            </Box>
          )}
        </FieldArray>
      )}
    </div>
  );
};

export default Dependents;
