package com.cs450.project.dao;

import java.util.List;

import com.cs450.project.model.WorksOn;

public interface WorksOnDaoInterface {

    public void save(String ssn, WorksOn project);

    public List<WorksOn> findAll(String ssn);
}
