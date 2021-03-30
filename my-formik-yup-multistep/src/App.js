import NewEmployee from "./Containers/NewEmployee";
import "./App.css";
import React, { Component } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import Employees from "./Containers/Employees";
import EmployeeInfo from "./Containers/EmployeeInfo";
import { AppBar, Toolbar, Button } from "@material-ui/core";
class App extends Component {
  addHandler = () => {
    this.props.history.push("/");
  };
  viewHandler = () => {
    this.props.history.push("/employees");
  };
  render() {
    return (
      <div className="App">
        <AppBar>
          <Toolbar>
            <Button onClick={this.addHandler} color="inherit">
              Add
            </Button>
            <Button onClick={this.viewHandler} color="inherit">
              View
            </Button>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path="/employees/:id" component={EmployeeInfo} />
          <Route path="/employees" component={Employees} />
          <Route path="/" component={NewEmployee} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
