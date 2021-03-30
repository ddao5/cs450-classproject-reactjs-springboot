import axios from "axios";
//Step one backend validation sends the manager ssn to the backend to check if
// there is a row in EMPLOYEE table, who is a department manager matches with the given ssn.
const stepOne = async (values, helpers) => {
  const { superSsn } = values;
  const config = {
    headers: {
      "Content-Type": "text/plain",
    },
  };
  let hasError = false;
  //make POST request to the backend
  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1/employee/checkmgr",
      superSsn,
      config
    );
    //if the return JSON object has no error field, that means the provided ssn belongs to a manager.
    //Therefore, we set the department number for the new employee as the deparmnet number of the manager.
    if (!res.data.error) {
      helpers.setValues({ ...values, dno: res.data.employee.dno }, false);
    } else {
      hasError = true;
      //set error to prevent going to the next step
      helpers.setFieldError("superSsn", res.data.error);
    }
  } catch (err) {
    hasError = true;
    console.error(err);
  }
  return hasError;
};
//backend validation to validate whether the new employee's ssn has already been taken.
const stepTwo = async (values, helpers) => {
  const { ssn } = values;
  const config = {
    headers: {
      "Content-Type": "text/plain",
    },
  };
  let hasError = false;
  //make POST request to the server
  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1/employee/checkemp",
      ssn,
      config
    );
    // if there is an error filed in the returned JSON object, the new employee's ssn has been taken.
    // We need to let Formik know that so it prevents us going to next step.
    if (res.data.error) {
      hasError = true;
      helpers.setFieldError("ssn", res.data.error);
    }
  } catch (e) {
    hasError = true;
    console.error(e);
  }
  return hasError;
};
const handler = async (values, helpers, step) => {
  switch (step) {
    case 0:
      return await stepOne(values, helpers);
    case 1:
      return await stepTwo(values, helpers);
    default:
      break;
  }
  return false;
};

export default handler;
