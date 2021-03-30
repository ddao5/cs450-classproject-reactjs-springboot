import axios from "axios";
const stepOne = async (values, helpers) => {
  const { superSsn } = values;
  const config = {
    headers: {
      "Content-Type": "text/plain",
    },
  };
  let hasError = false;
  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1/employee/checkmgr",
      superSsn,
      config
    );
    if (!res.data.error) {
      helpers.setValues({ ...values, dno: res.data.employee.dno }, false);
    } else {
      hasError = true;
      helpers.setFieldError("superSsn", res.data.error);
    }
  } catch (err) {
    hasError = true;
    console.error(err);
  }
  return hasError;
};
const stepTwo = async (values, helpers) => {
  const { ssn } = values;
  const config = {
    headers: {
      "Content-Type": "text/plain",
    },
  };
  let hasError = false;
  try {
    const res = await axios.post(
      "http://localhost:8080/api/v1/employee/checkemp",
      ssn,
      config
    );
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
