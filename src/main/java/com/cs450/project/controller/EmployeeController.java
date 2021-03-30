package com.cs450.project.controller;

import java.util.List;

import com.cs450.project.dao.DependentDao;
import com.cs450.project.dao.EmployeeDao;
import com.cs450.project.dao.WorksOnDao;
import com.cs450.project.model.Dependent;
import com.cs450.project.model.Employee;
import com.cs450.project.model.EmployeeResponse;
import com.cs450.project.model.WorksOn;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/employee")
@CrossOrigin
/**
 * This class is used as REST api to handle requests from client.
 */
public class EmployeeController {
    /**
     * Containing database operations regarding to employee table.
     */
    private final EmployeeDao employeeDao;
    /**
     * Containing database operation regarding to dependent table.
     */
    private final DependentDao dependentDao;
    /**
     * Containing database operation regarding to works_on table.
     */
    private final WorksOnDao worksOnDao;

    /**
     * Autowired lets Spring Boot know that this class is a Bean and it should instantiate this class automatically.
     * @param employeeDao employeeDao
     * @param dependentDao dependentDao
     * @param worksOnDao worksOnDao
     */
    @Autowired
    public EmployeeController(EmployeeDao employeeDao, DependentDao dependentDao, WorksOnDao worksOnDao) {
        this.employeeDao = employeeDao;
        this.dependentDao = dependentDao;
        this.worksOnDao = worksOnDao;
    }

    /**
     * Return all employees in database to the client.
     * @return
     */
    @GetMapping
    public List<Employee> getEmployees() {
        return employeeDao.findAll();
    }
    /**
     * Return a single employee based on the provided ssn to the client.
     */
    @GetMapping(path = "/{ssn}/personal") 
    public Employee getEmployee(@PathVariable String ssn) {
        Employee emp = employeeDao.find(ssn);
        return emp;
    }
    /**
     * Return all dependents of an employee with the given ssn to the client.
     * @param ssn employee's ssn provided by client side.
     * @return all dependents of an employee with the given ssn to the client
     */
    @GetMapping(path = "/{ssn}/dependents")
    public List<Dependent> getEmpDependents(@PathVariable String ssn) {
        List<Dependent> dependents = dependentDao.findAll(ssn);
        return dependents;
    }
    /**
     * Return all projects on which an employee is currently working with the given ssn to the client.
     * @param ssn employee's ssn provided by client side.
     * @return all projects on which an employee is currently working
     */
    @GetMapping(path = "/{ssn}/projects")
    public List<WorksOn> getEmpProjects(@PathVariable String ssn) {
        List<WorksOn> projects = worksOnDao.findAll(ssn);
        return projects;
    }
    /**
     * Route to check whether the provided a person with the provided ssn is a
     * department manager.
     * 
     * @param ssn ssn delivered from front-end
     * @return the response object containing either error message if there is no department manager with the given ssn, or an Employee object if the given ssn is valid
     */
    @PostMapping(path = "/checkmgr")
    public EmployeeResponse checkIfManager(@RequestBody String ssn) {
        Employee emp = employeeDao.getDeptManager(ssn.replace("-", ""));
        if (emp == null) {
            return new EmployeeResponse("The provided dssn does not belong to any manager");
        }
        return new EmployeeResponse(emp);
    }

    /**
     * Check if given ssn from client has already been in the database.
     * @param ssn provided by the client
     * @return the response object containing either error message if there is no department manager with the given ssn, or nothing if the given ssn is valid
     */
    @PostMapping(path = "/checkemp")
    public EmployeeResponse existsEmp(@RequestBody String ssn) {
        Employee emp = employeeDao.find(ssn.replace("-", ""));
        if (emp != null) {
            return new EmployeeResponse("The provided ssn is already in the database");
        }
        return new EmployeeResponse();
    }

    /**
     * Create a new employee row in EMPLOYEE table, all his/her depedent rows in DEPENDENT table and project rows in WORKS_ON table.
     * @param emp a JSON including all necessary information to complete the creation of a new employee in the database schema
     * @return the newly created employee
     */
    @PostMapping(path = "/create")
    public EmployeeResponse createNewEmp(@RequestBody Employee emp) {
        List<Dependent> dependents = emp.getDependents();
        List<WorksOn> projects = emp.getProjects();
        emp.setSsn(emp.getSsn().replace("-", ""));
        emp.setSuperSsn(emp.getSuperSsn().replace("-", ""));
        employeeDao.save(emp);
        for (Dependent dependent : dependents) {
            dependentDao.save(emp.getSsn(), dependent);
        }
        for (WorksOn project : projects) {
            worksOnDao.save(emp.getSsn(), project);
        }
        return new EmployeeResponse(emp);
    }

}
