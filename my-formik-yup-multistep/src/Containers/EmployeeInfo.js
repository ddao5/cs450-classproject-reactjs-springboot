import { Component } from "react";
import axios from "axios";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { DataGrid } from "@material-ui/data-grid";
/**
 * A simple component providing all dependents and projects associated with an employee in the database.
 */
class EmployeeInfo extends Component {
  state = {
    dependents: [],
    projects: [],
  };
  async componentDidMount() {
    //making GET request to our backend to get all dependents
    const resDependents = await axios.get(
      `http://localhost:8080/api/v1/employee/${this.props.match.params.id}/dependents`
    );
    //making GET request to our backend to get all projects
    const resProjects = await axios.get(
      `http://localhost:8080/api/v1/employee/${this.props.match.params.id}/projects`
    );
    const dependents = [];
    const projects = [];

    for (let i = 0; i < resDependents.data.length; i++) {
      dependents.push({ id: i + 1, ...resDependents.data[i] });
    }
    for (let i = 0; i < resProjects.data.length; i++) {
      projects.push({ id: i + 1, ...resProjects.data[i] });
    }
    this.setState({
      dependents: dependents,
      projects: projects,
    });
  }
  render() {
    const dependentColumns = [
      { field: "dependentName", headerName: "NAME", width: 130 },
      { field: "bDate", headerName: "Birthday", width: 130 },
      { field: "sex", headerName: "GENDER", width: 130 },
      { field: "relationship", headerName: "RELATIONSHIP", width: 200 },
    ];
    const projectColumns = [
      { field: "pNumber", headerName: "PROJECT#", width: 150 },
      { field: "hours", headerName: "HOURS", width: 150 },
    ];
    return (
      <div style={{ background: "white", width: "70%" }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Dependents</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ height: "300px" }}>
            <DataGrid
              rows={this.state.dependents}
              columns={dependentColumns}
              pageSize={3}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Projects</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ height: "300px" }}>
            <DataGrid
              rows={this.state.projects}
              columns={projectColumns}
              pageSize={3}
            />
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}

export default EmployeeInfo;
