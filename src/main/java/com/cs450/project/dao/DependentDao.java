package com.cs450.project.dao;

import java.util.List;

import com.cs450.project.model.Dependent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Component
@Repository
@Qualifier("dependentDao")
public class DependentDao implements DepdentDaoInterface {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    private RowMapper<Dependent> rowMapper = (rs, rowNum) -> {
        Dependent dependent = new Dependent();
        dependent.setDependentName(rs.getString("dependent_name"));
        dependent.setSex(rs.getString("sex").charAt(0));
        dependent.setbDate(rs.getDate("bdate").toLocalDate());
        dependent.setRelationship(rs.getString("relationship"));
        return dependent;
    };

    @Override
    public void save(String ssn, Dependent dependent) {
        String sql = "INSERT INTO dependent(essn,dependent_name,sex,bdate,relationship) values (?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql, ssn, dependent.getDependentName(), String.valueOf(dependent.getSex()), dependent.getbDate(),
                dependent.getRelationship());
        return;
    }

    @Override
    public List<Dependent> findAll(String ssn) {
        return jdbcTemplate.query("SELECT dependent_name, sex, bdate, relationship FROM dependent WHERE essn = ?",
                rowMapper, ssn);
    }

}
