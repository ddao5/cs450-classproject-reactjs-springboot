import { Box } from "@material-ui/core";
import MyDatePicker from "./CustomUI/MyDatePicker";
import SsnTextField from "./CustomUI/SsnTextField";
import MyTextField from "./CustomUI/MyTextField";
import MySelectField from "./CustomUI/MySelectField";

/**
 * This is used to request user to fill out information (attributes) regarding the new employee, such as
 * first name, initial, last name, etc.
 */
const PersonalInfo = (props) => {
  return (
    <>
      <Box paddingBottom={2}>
        <MyTextField
          name={props.firstName}
          placeholder="First Name"
          variant="outlined"
        />
        <MyTextField
          name={props.mInit}
          placeholder="Initial"
          variant="outlined"
          width="small"
          inputProps={{
            maxLength: 1,
          }}
        />
        <MyTextField
          name={props.lastName}
          placeholder="Last Name"
          variant="outlined"
        />
      </Box>
      <Box display="flex" paddingBottom={1}>
        <MySelectField
          name={props.sex}
          items={["F", "M"]}
          placeholder="Gender"
          width="small"
        />
        <MyDatePicker
          variant="inline"
          format="DD-MM-YYYY"
          label="Birthday"
          name={props.bDate}
          width="small"
        />
        <SsnTextField placeholder="Employee SSN" name={props.ssn} />
      </Box>
      <Box paddingBottom={2}>
        <MyTextField type="number" name="salary" placeholder="Salary" variant="outlined" />
      </Box>
      <Box paddingBottom={2}>
        <MyTextField
          name={props.address}
          placeholder="Address"
          variant="outlined"
        />
        <MyTextField
          name={props.email}
          placeholder="Email"
          variant="outlined"
        />
      </Box>
    </>
  );
};

export default PersonalInfo;
