package com.cs450.project.dao;

import java.util.List;

import com.cs450.project.model.WorksOn;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
@Component
@Repository
@Qualifier("worksOnDao")
public class WorksOnDao implements WorksOnDaoInterface {
    @Autowired
    private final JdbcTemplate jdbcTemplate;
    private RowMapper<WorksOn> rowMapper = (rs, rowNum) -> {
        WorksOn project = new WorksOn();
        project.setpNumber(Integer.toString(rs.getInt("pno")));
        project.setHours(rs.getDouble("hours"));
        return project;
    };

    public WorksOnDao(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void save(String ssn, WorksOn project) {
        String sql = "INSERT INTO works_on(essn, pno, hours) values (?, ?, ?)";
        jdbcTemplate.update(sql, ssn, project.getpNumber(), project.getHours());
        return;
    }

    @Override
    public List<WorksOn> findAll(String ssn) {
        return jdbcTemplate.query("SELECT pno, hours FROM works_on WHERE essn = ?", rowMapper, ssn);
    }

}
