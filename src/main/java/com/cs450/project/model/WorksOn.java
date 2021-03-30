package com.cs450.project.model;

public class WorksOn {
    private String pNumber;
    private double hours;

    public WorksOn(String pNumber, double hours) {
        this.pNumber = pNumber;
        this.hours = hours;
    }

    public WorksOn() {

    }

    /**
     * @return the pNumber
     */
    public String getpNumber() {
        return pNumber;
    }

    /**
     * @param pNumber the pNumber to set
     */
    public void setpNumber(String pNumber) {
        this.pNumber = pNumber;
    }

    /**
     * @return the hours
     */
    public double getHours() {
        return hours;
    }

    /**
     * @param hours the hours to set
     */
    public void setHours(double hours) {
        this.hours = hours;
    }

    /*
     * (non-Javadoc)
     * 
     * @see java.lang.Object#toString()
     */

    @Override
    public String toString() {
        return "WorksOn [hours=" + hours + ", pNumber=" + pNumber + "]";
    }
}
