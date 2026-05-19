/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.domain;

public class UnitGroup {

    private String carBrand;
    private String carName;
    private int yearManufacture;
    private String transmissionGroup;
    private String bodyWork;
    private String fuelGroup;

    public UnitGroup(String carBrand, String carName, int yearManufacture,
            String transmissionGroup, String bodyWork, String fuelGroup) {
        this.carBrand = carBrand;
        this.carName = carName;
        this.yearManufacture = yearManufacture;
        this.transmissionGroup = transmissionGroup;
        this.bodyWork = bodyWork;
        this.fuelGroup = fuelGroup;
    }

    public String getCarBrand() {
        return carBrand;
    }

    public void setCarBrand(String carBrand) {
        this.carBrand = carBrand;
    }

    public String getCarName() {
        return carName;
    }

    public void setCarName(String carName) {
        this.carName = carName;
    }

    public int getYearManufacture() {
        return yearManufacture;
    }

    public void setYearManufacture(int yearManufacture) {
        this.yearManufacture = yearManufacture;
    }

    public String getTransmissionGroup() {
        return transmissionGroup;
    }

    public void setTransmissionGroup(String transmissionGroup) {
        this.transmissionGroup = transmissionGroup;
    }

    public String getBodyWork() {
        return bodyWork;
    }

    public void setBodyWork(String bodyWork) {
        this.bodyWork = bodyWork;
    }

    public String getFuelGroup() {
        return fuelGroup;
    }

    public void setFuelGroup(String fuelGroup) {
        this.fuelGroup = fuelGroup;
    }
}
