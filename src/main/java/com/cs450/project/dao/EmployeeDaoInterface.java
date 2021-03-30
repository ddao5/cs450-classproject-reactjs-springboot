package com.cs450.project.dao;


import java.util.List;

import com.cs450.project.model.Employee;

public interface EmployeeDaoInterface {

    public void save(Employee employee);

    public void update(Employee employee, String ssn);

    public void delete(String ssn);

    public Employee find(String ssn);

    public List<Employee> findAll();

    public Employee getDeptManager(String ssn);
}
