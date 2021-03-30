package com.cs450.project.dao;

import java.util.List;

import com.cs450.project.model.Dependent;


public interface DepdentDaoInterface {
    public void save(String ssn, Dependent dependent);
    public List<Dependent> findAll(String ssn);
}
