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
/**
 * This component is used to give user option to add dependents of a new employee to the database later.
 */
const Dependents = (props) => {
  //this lets Formik know that it would change the values of Formik initial values.
  const [field, meta] = useField({ name: "dependents" });
  //used to add a new dependent entry to the form
  const addHandler = (arrayHelpers) => {
    arrayHelpers.push({
      dependentName: "",
      sex: "",
      bDate: null,
      relationship: "",
    });
  };
  //used to delete a dependent entry off the form
  const deleteHandler = (arrayHelpers, index) => {
    arrayHelpers.remove(index);
    if (meta.value.length === 1) {
      props.changedHasDependent(false, meta);
    }
  };
  const isNewest = (index) => {
    return index === field.value.length - 1;
  };
  //a dialog with check boxes to indicate whether a new employee has dependents or not
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
      {/**if hasDependent: false => show dialog, otherwise, show entries to enter dependents' information*/}
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
