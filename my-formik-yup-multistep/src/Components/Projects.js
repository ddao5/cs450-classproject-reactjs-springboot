import { FieldArray, useField } from "formik";
import { Box, IconButton, FormHelperText } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons/";
import MyTextField from "./CustomUI/MyTextField";
import MySelectField from "./CustomUI/MySelectField";

/**
 * This component is used to ask user to enter project number and number of hours a new employee will spend on that project.
 */
const Projects = () => {
  const [field, meta] = useField({ name: "projects" });
  const addHandler = (arrayHelpers) => {
    arrayHelpers.push({
      pNumber: "",
      hours: 1,
    });
  };
  const deleteHandler = (arrayHelpers, index) => {
    arrayHelpers.remove(index);
  };
  const isNewest = (index) => {
    return index === field.value.length - 1;
  };
  const isLast = () => {
    return field.value.length === 1;
  };
  return (
    <FieldArray {...field}>
      {(arrayHelpers) => (
        <Box>
          {meta.value.map((project, index) => (
            <Box key={index}>
              <MySelectField
                name={`projects[${index}].pNumber`}
                items={["1", "2", "3", "10", "20", "30"]}
                placeholder="Project Number"
              />
              <MyTextField
                name={`projects[${index}].hours`}
                placeholder="Hours"
                type="number"
                variant="outlined"
              />
              {!isLast() ? (
                <IconButton
                  onClick={(index) => deleteHandler(arrayHelpers, index)}
                >
                  <Delete />
                </IconButton>
              ) : null}
              {isNewest(index) ? (
                <IconButton
                  onClick={() => addHandler(arrayHelpers)}
                  aria-label="add"
                >
                  <Add />
                </IconButton>
              ) : null}
            </Box>
          ))}
          {typeof meta.error === "string" && meta.touched ? (
            <FormHelperText style={{ marginLeft: "0.5rem" }} error>
              {meta.error}
            </FormHelperText>
          ) : null}
        </Box>
      )}
    </FieldArray>
  );
};

export default Projects;
