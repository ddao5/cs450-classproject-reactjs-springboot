import * as yup from "yup";
import * as dayjs from "dayjs";

export const stageOneValidation = yup.object({
  superSsn: yup
    .string()
    .required("Required")
    .matches(/^\d{3}-?\d{2}-?\d{4}$/, "Must be 9 digits"),
});
export const stageTwoValidation = yup.object({
  firstName: yup
    .string()
    .required("Required")
    .max(255, "Must be 255 characters or less"),
  lastName: yup
    .string()
    .required("Required")
    .max(255, "Must be 255 characters or less"),
  salary: yup.number().required("Required").positive("Invalid salary"),
  sex: yup.string().required("Required"),
  bDate: yup
    .date()
    .nullable()
    .required("Required")
    .max(dayjs().add(1, "day"), "You must come from the future"),
  ssn: yup
    .string()
    .required("Required")
    .matches(/^\d{3}-?\d{2}-?\d{4}$/, "Must be 9 digits"),
  address: yup.string().required("Required"),
  email: yup.string().email().max(255, "Must be 255 characters or less").required("Required"),
});
// Stage three validation is a bit comlicated because we need to make sure that
// each entry has a unique project number and its hours do not exceed 40.
// In addition to that, we need to make sure the total hours do exceed 40 as well.  
export const stageThreeValidation = yup.object({
  projects: yup
    .array()
    .of(
      yup.object({
        pNumber: yup.string().required("Required"),
        hours: yup
          .number()
          .required("Required")
          .positive("Invalid hours")
          .max(40, "Must be less than 40 hours"),
      })
    )
    .test(
      "total",
      "Total hours can only be at most 40 hours",
      (projects = []) => {
        let total = 0;
        for (let i = 0; i < projects.length; i++) {
          total += projects[i].hours || 0;
        }
        return total <= 40;
      }
    )
    .test("unique", "Duplication of a project number", (projects = []) => {
      let dict = {};
      for (let i = 0; i < projects.length; i++) {
        if (!dict[projects[i].pNumber]) dict[projects[i].pNumber] = 1;
        else return false;
      }
      return true;
    }),
});


//Stage four validation used to make sure that a dependent's name is unique as well, because
// in the database, the new employee's ssn and dependent are used as primary key in DEPENDENT table,
// which requires the dependent's name must be unique.
export const stageFourValidation = yup.object({
  dependents: yup.array().of(
    yup.object({
      dependentName: yup.string().max(255, "Must be 255 characters or less").required("Required"),
      sex: yup.string().required("Required"),
      bDate: yup
        .date()
        .nullable()
        .required("Required")
        .max(dayjs().add(1, "day"), "You must come from the future"),
      relationship: yup.string().required("Required"),
    })
  ).test("unique", "Duplication of a dependent's name", (dependents = []) => {
    let dict = {};
    for(let i = 0; i < dependents.length; i++) {
      if(!dict[dependents[i].dependentName]) dict[dependents[i].dependentName] = 1;
      else return false;
    }
    return true;
  }),
});
