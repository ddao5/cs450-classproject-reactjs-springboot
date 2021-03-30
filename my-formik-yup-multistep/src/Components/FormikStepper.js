import React, { useState } from "react";
import { Form, Formik } from "formik";
import {
  Button,
  Grid,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Box,
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import SendIcon from "@material-ui/icons/Send";
import backendValidation from "../validation/backendValidation";
/**
 * A Main component used to create a Multi-step form.
 * Number of children components is the number of steps in a form.
 * Each step (i.e: a child) can provide its label and validation schema to this component
 * to validate the current step's data.
 */
const FormikStepper = ({ children, ...props }) => {
  const childrenArray = React.Children.toArray(children);
  //A react hook used to manipulate steps
  //step: integer
  const [step, setStep] = useState(0);
  //A react hook used to indicate whether a current step is validated and finished
  //compted: boolean
  const [completed, setCompleted] = useState(false);
  const currChild = childrenArray[step];
  const isLaststep = () => {
    return step === childrenArray.length - 1;
  };
  const redirectButton = () => {
    props.history.push("/employees");
  };
  const dialog = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      style={{ height: "150px" }}
      justifyContent="center"
    >
      <h7 style={{ paddingBottom: "1em" }}>
        A NEW EMPLOYEE HAS BEEN ADDED TO THE DATABASE.
      </h7>
      <Button onClick={redirectButton} endIcon={<CheckCircleIcon />} color="primary" variant="contained">
        OK
      </Button>
    </Box>
  );
  //A function handles when the form is at its last step, and it is submitted by users.
  const submitHanlder = async (values, helpers) => {
    let hasErr = false;
    let next = 1;
    if (isLaststep()) {
      //set submitting to true to disable "submit" button when a POST request is being made
      //this avoids double submission
      helpers.setSubmitting(true);
      await props.onSubmit(values, step);
      //set submitting to false to enable "submit" button when a POST request is being made
      helpers.setSubmitting(false);
      //set complete is true for the last step
      setCompleted(true);
    } else {
      hasErr = await backendValidation(values, helpers, step);
      helpers.setSubmitting(false);
      if (hasErr) {
        next = 0;
      }
      setStep((currentstep) => currentstep + next);
    }
  };
  return (
    <>
      {completed ? (
        dialog
      ) : (
        <Formik
          {...props}
          onSubmit={(values, helpers) => submitHanlder(values, helpers)}
          validationSchema={currChild.props.validationSchema}
        >
          {({ isSubmitting }) => (
            <Form autoComplete="off">
              {/*A stepper to show the progress of the form*/}
              <Stepper alternativeLabel activeStep={step}>
                {childrenArray.map((child, index) => (
                  <Step
                    key={child.props.label}
                    completed={step > index || completed}
                  >
                    <StepLabel>{child.props.label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              {/*Render current step*/}
              {currChild}
              <Grid
                container
                style={{ marginTop: "1em" }}
                justify="center"
                spacing={2}
              >
                <Grid item>
                  {/*If this is not last step, the content of button is "Next"*/}
                  <Button
                    startIcon={
                      isLaststep() ? (
                        isSubmitting ? (
                          <CircularProgress size="1rem" />
                        ) : (
                          <SendIcon />
                        )
                      ) : null
                    }
                    disabled={isSubmitting}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    {isLaststep() ? "Submit" : "Next"}
                  </Button>
                </Grid>
                <Grid item>
                  {step > 0 ? (
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => setStep((currentstep) => currentstep - 1)}
                    >
                      Back
                    </Button>
                  ) : null}
                </Grid>
              </Grid>
              {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default FormikStepper;
