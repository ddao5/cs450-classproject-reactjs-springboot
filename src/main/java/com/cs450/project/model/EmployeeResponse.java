package com.cs450.project.model;


/**
 * A java object used as a reponse object to the client.
 * If there is an error in cases such as the super manager's is invalid  or the new employee's ssn has been already taken,
 * the object would error message and the employee object is null.
 */
public class EmployeeResponse {
    private final String error;
    private final Employee employee;

    public EmployeeResponse(String error) {
        this.error = error;
        this.employee = null;
    }

    public EmployeeResponse(Employee employee) {
        this.error = null;
        this.employee = employee;
    }
    public EmployeeResponse() {
        this.error = null;
        this.employee = null;
    }
    public String getError() {
        return this.error;
    }

    public Employee getEmployee() {
        return this.employee;
    }
}
