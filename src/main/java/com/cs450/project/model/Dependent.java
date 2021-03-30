package com.cs450.project.model;

import java.time.LocalDate;

public class Dependent {
    private String dependentName;
    private char sex;
    private LocalDate bDate;
    private String relationship;

    /**
     * @param dependentName
     * @param sex
     * @param bDate
     * @param relationship
     */
    public Dependent(String dependentName, char sex, LocalDate bDate, String relationship) {
        this.dependentName = dependentName;
        this.sex = sex;
        this.bDate = bDate;
        this.relationship = relationship;
    }

    public Dependent() {
    }

    /**
     * @return the dependentName
     */
    public String getDependentName() {
        return dependentName;
    }

    /**
     * @param dependentName the dependentName to set
     */
    public void setDependentName(String dependentName) {
        this.dependentName = dependentName;
    }

    /**
     * @return the sex
     */
    public char getSex() {
        return sex;
    }

    /**
     * @param sex the sex to set
     */
    public void setSex(char sex) {
        this.sex = sex;
    }

    /**
     * @return the bDate
     */
    public LocalDate getbDate() {
        return bDate;
    }

    /**
     * @param bDate the bDate to set
     */
    public void setbDate(LocalDate bDate) {
        this.bDate = bDate;
    }

    /**
     * @return the relationship
     */
    public String getRelationship() {
        return relationship;
    }

    /**
     * @param relationship the relationship to set
     */
    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }
    /*
     * (non-Javadoc)
     * 
     * @see java.lang.Object#toString()
     */

    @Override
    public String toString() {
        return "Dependent [bDate=" + bDate + ", dependentName=" + dependentName + ", relationship=" + relationship
                + ", sex=" + sex + "]";
    }

}
