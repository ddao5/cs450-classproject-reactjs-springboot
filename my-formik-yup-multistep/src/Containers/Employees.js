import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Component } from "react";
import axios from "axios";

/**
 * A simple component used to provide all information of employees in the database.
 */
class Employees extends Component {
  state = {
    rows: [],
  };
  async componentDidMount() {
    const res = await axios.get("http://localhost:8080/api/v1/employee");
    const data = [...res.data];
    const rows = [];
    for (let i = 0; i < data.length; i++) {
      const {
        address,
        bDate,
        dno,
        firstName,
        lastName,
        mInit,
        salary,
        email,
        ssn,
        superSsn,
      } = data[i];
      rows.push({
        id: i + 1,
        address,
        bDate,
        dno,
        firstName,
        lastName,
        mInit,
        salary,
        email,
        ssn,
        superSsn,
      });
    }
    this.setState({ rows: rows });
  }
  render() {
    const columns = [
      { field: "firstName", headerName: "FNAME", width: 130 },
      { field: "mInit", headerName: "MINIT", widht: 90 },
      { field: "lastName", headerName: "LNAME", width: 130 },
      { field: "bDate", headerName: "BDATE", width: 130 },
      { field: "salary", headerName: "SALARY", width: 130 },
      { field: "address", headerName: "ADDRESS", width: 150 },
      {
        field: "dno",
        headerName: "DNO",
        type: "number",
        width: 90,
      },
      { field: "email", headerName: "EMAIL", width: 200 },
      { field: "superSsn", headerName: "MANAGER", width: 130 },
      { field: "ssn", headerName: "SSN", width: 130 },
    ];
    return (
      <div style={{ background: "white", height: 600, width: "80%" }}>
        <DataGrid
          onRowDoubleClick={(params) => {
            this.props.history.push(`/employees/${params.row.ssn}`);
          }}
          rows={this.state.rows}
          columns={columns}
          pageSize={8}
        />
      </div>
    );
  }
}

export default Employees;
