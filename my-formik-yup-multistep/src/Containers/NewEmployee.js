import { useState } from "react";
import FormikStepper from "../Components/FormikStepper";
import Stage from "../Components/Stage";
import { Box, Card, CardContent } from "@material-ui/core";
import SsnTextField from "../Components/CustomUI/SsnTextField";
import PersonalInfo from "../Components/PersonalInfo";
import Projects from "../Components/Projects";
import Dependents from "../Components/Dependents";
import {
  stageOneValidation,
  stageTwoValidation,
  stageThreeValidation,
  stageFourValidation,
} from "../validation/validationSchemas";
import classes from "./NewEmployee.module.css";
import axios from "axios";
const NewEmployee = (props) => {
  const [hasDependent, setHasDependent] = useState(false);
  //this only get called we remove the last dependent or when we first add a dependent (ANSWER: YES)
  const changedHasDependent = (value, meta) => {
    if (value)
      meta.value.push({
        dependentName: "",
        sex: "",
        bDate: null,
        relationship: "",
      });
    else if (meta.value.length === 1) meta.initialValues = [];
    setHasDependent(value);
  };
  const submitHandler = async (values) => {
    await axios.post(
      "http://localhost:8080/api/v1/employee/create",
      values
    );
  };
  return (
    <div className={classes.NewEmployee}>
      <Card>
        <CardContent>
          <FormikStepper
            initialValues={{
              superSsn: "",
              firstName: "",
              mInit: "",
              lastName: "",
              salary: 0,
              sex: "",
              bDate: null,
              ssn: "",
              address: "",
              email: "",
              dno: 0,
              projects: [{ pNumber: "1", hours: 1 }],
              dependents: [],
            }}
            {...props}
            onSubmit={submitHandler}
          >
            <Stage validationSchema={stageOneValidation} label="Verification">
              <Box paddingBottom={2}>
                <SsnTextField name="superSsn" placeholder="Manager SSN" />
              </Box>
            </Stage>
            <Stage
              validationSchema={stageTwoValidation}
              label="Personal Information"
            >
              <PersonalInfo
                firstName="firstName"
                mInit="mInit"
                lastName="lastName"
                bDate="bDate"
                ssn="ssn"
                address="address"
                email="email"
                sex="sex"
              />
            </Stage>
            <Stage
              validationSchema={stageThreeValidation}
              label="Assign Projects"
            >
              <Projects />
            </Stage>
            <Stage
              validationSchema={hasDependent ? stageFourValidation : null}
              label="Dependent Information"
            >
              <Dependents
                hasDependent={hasDependent}
                changedHasDependent={changedHasDependent}
              />
            </Stage>
          </FormikStepper>
        </CardContent>
      </Card>
    </div>
  );
};
export default NewEmployee;
