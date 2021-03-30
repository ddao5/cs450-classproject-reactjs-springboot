package com.cs450.project.model;

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
