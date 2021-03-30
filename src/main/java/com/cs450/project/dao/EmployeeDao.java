package com.cs450.project.dao;

import java.util.List;

import org.springframework.jdbc.core.RowMapper;

import com.cs450.project.model.Employee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Component
@Repository
@Qualifier("employeeDao")
public class EmployeeDao implements EmployeeDaoInterface {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    private RowMapper<Employee> rowMapper = (rs, rowNum) -> {
        Employee employee = new Employee();
        employee.setFirstName(rs.getString("fname"));
        employee.setmInit(rs.getString("minit"));
        employee.setLastName(rs.getString("lname"));
        employee.setSsn(rs.getString("ssn"));
        employee.setbDate(rs.getDate("bdate").toLocalDate());
        employee.setAddress(rs.getString("address"));
        employee.setSex(rs.getString("sex").charAt(0));
        employee.setSalary(rs.getFloat("salary"));
        employee.setSuperSsn(rs.getString("superssn"));
        employee.setDno(rs.getInt("dno"));
        employee.setEmail(rs.getString("email"));
        return employee;
    };

    public EmployeeDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void save(Employee employee) {
        jdbcTemplate.update(
                "INSERT INTO employee(fname,minit,lname,ssn,bdate,address,sex,salary,superssn,dno,email) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
                employee.getFirstName(), employee.getmInit(), employee.getLastName(), employee.getSsn(),
                employee.getbDate(), employee.getAddress(), String.valueOf(employee.getSex()), employee.getSalary(),
                employee.getSuperSsn(), employee.getDno(), employee.getEmail());
    }

    @Override
    public Employee find(String ssn) {
        String sql = "SELECT * FROM employee WHERE ssn = ?";
        List<Employee> list = jdbcTemplate.query(sql, rowMapper, ssn);
        if (list.size() == 0) {
            return null;
        }
        return list.get(0);
    }

    @Override
    public List<Employee> findAll() {
        return jdbcTemplate.query("SELECT * FROM employee", rowMapper);
    }

    @Override
    public Employee getDeptManager(String ssn) {
        String sql = "SELECT e.* FROM employee e, department d WHERE e.dno = d.dnumber AND e.ssn = d.mgrssn AND e.ssn = ?";
        List<Employee> deptManager = jdbcTemplate.query(sql, rowMapper, ssn);
        if (deptManager.size() == 0) {
            return null;
        }
        return deptManager.get(0);
    }

}
