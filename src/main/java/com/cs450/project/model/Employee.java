package com.cs450.project.model;

import java.time.LocalDate;
import java.util.List;
public class Employee {
    private String firstName;
    private String mInit;
    private String lastName;
    private String ssn;
    private LocalDate bDate;
    private String address;
    private char sex;
    private float salary;
    private String superSsn;
    private int dno;
    private String email;
    private List<WorksOn> projects;
    private List<Dependent> dependents;

    /**
     * 
     */
    public Employee() {
    }

    /**
     * @param firstName
     * @param mInit
     * @param lastName
     * @param ssn
     * @param bDate
     * @param address
     * @param sex
     * @param salary
     * @param superSsn
     * @param dno
     * @param email
     */
    public Employee(String firstName, String mInit, String lastName, String ssn, LocalDate bDate, String address,
            char sex, float salary, String superSsn, int dno, String email) {
        this.firstName = firstName;
        this.mInit = mInit;
        this.lastName = lastName;
        this.ssn = ssn;
        this.bDate = bDate;
        this.address = address;
        this.sex = sex;
        this.salary = salary;
        this.superSsn = superSsn;
        this.dno = dno;
        this.email = email;
    }

    /**
     * @param firstName
     * @param mInit
     * @param lastName
     * @param ssn
     * @param bDate
     * @param address
     * @param sex
     * @param salary
     * @param superSsn
     * @param dno
     * @param email
     * @param projects
     * @param dependents
     */
    public Employee(String firstName, String mInit, String lastName, String ssn, LocalDate bDate, String address,
            char sex, float salary, String superSsn, int dno, String email, List<WorksOn> projects,
            List<Dependent> dependents) {
        this.firstName = firstName;
        this.mInit = mInit;
        this.lastName = lastName;
        this.ssn = ssn;
        this.bDate = bDate;
        this.address = address;
        this.sex = sex;
        this.salary = salary;
        this.superSsn = superSsn;
        this.dno = dno;
        this.email = email;
        this.projects = projects;
        this.dependents = dependents;
    }

    @Override
    public String toString() {
        return "Employee [address=" + address + ", bDate=" + bDate + ", dependents=" + dependents + ", dno=" + dno
                + ", email=" + email + ", firstName=" + firstName + ", lastName=" + lastName + ", mInit=" + mInit
                + ", projects=" + projects + ", salary=" + salary + ", sex=" + sex + ", ssn=" + ssn + ", superSsn="
                + superSsn + "]";
    }

    /**
     * @return the ssn
     */
    public String getSsn() {
        return ssn;
    }

    /**
     * @param ssn the ssn to set
     */
    public void setSsn(String ssn) {
        this.ssn = ssn;
    }

    /**
     * @return the firstName
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * @param firstName the firstName to set
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * @return the mInit
     */
    public String getmInit() {
        return mInit;
    }

    /**
     * @param mInit the mInit to set
     */
    public void setmInit(String mInit) {
        this.mInit = mInit;
    }

    /**
     * @return the lastName
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * @param lastName the lastName to set
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
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
     * @return the address
     */
    public String getAddress() {
        return address;
    }

    /**
     * @param address the address to set
     */
    public void setAddress(String address) {
        this.address = address;
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
     * @return the salary
     */
    public float getSalary() {
        return salary;
    }

    /**
     * @param salary the salary to set
     */
    public void setSalary(float salary) {
        this.salary = salary;
    }

    /**
     * @return the superSsn
     */
    public String getSuperSsn() {
        return superSsn;
    }

    /**
     * @param superSsn the superSsn to set
     */
    public void setSuperSsn(String superSsn) {
        this.superSsn = superSsn;
    }

    /**
     * @return the dno
     */
    public int getDno() {
        return dno;
    }

    /**
     * @param dno the dno to set
     */
    public void setDno(int dno) {
        this.dno = dno;
    }

    /**
     * @return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * @return the projects
     */
    public List<WorksOn> getProjects() {
        return projects;
    }

    /**
     * @param projects the projects to set
     */
    public void setProjects(List<WorksOn> projects) {
        this.projects = projects;
    }

    /**
     * @return the dependents
     */
    public List<Dependent> getDependents() {
        return dependents;
    }

    /**
     * @param dependents the dependents to set
     */
    public void setDependents(List<Dependent> dependents) {
        this.dependents = dependents;
    }

}
