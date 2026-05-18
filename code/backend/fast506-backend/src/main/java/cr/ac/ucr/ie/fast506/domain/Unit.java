/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity //la vuelve una entidad en jpa
@Table(name = "units") //el nombre de la tabla en la base de datos
public class Unit {

    @Id //la llave primaria
    @GeneratedValue(strategy = GenerationType.IDENTITY) //genera el id
    @Column(name = "id_Car") //el nombre de la columna en la db
    private int idCar;

    @Column(name = "VIN")
    private String VIN;

    @Column(name = "engine_number")
    private String engineNumber;

    @Column(name = "car_brand")
    private String carBrand;

    @Column(name = "car_name")
    private String carName;

    @Column(name = "legal_brand_name")
    private String legalBrandName;

    @Column(name = "year_manufacture")
    private int yearManufacture;

    @Column(name = "color")
    private String color;

    @Column(name = "transmission")
    private String transmission;

    @Column(name = "traction")
    private String traction;

    @Column(name = "body_work")
    private String bodyWork;

    @Column(name = "engine_size")
    private String engineSize;

    @Column(name = "fuel_type")
    private String fuelType;

    @Column(name = "stock_status")
    private boolean stockStatus;

    @Column(name = "id_supplier")
    private Integer idSupplier;

    @Column(name = "is_active")
    private boolean isActive = true;

    public int getIdCar() {
        return idCar;
    }

    public void setIdCar(int idCar) {
        this.idCar = idCar;
    }

    public boolean isIsActive() {
        return isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }

    public String getVIN() {
        return VIN;
    }

    public void setVIN(String VIN) {
        this.VIN = VIN;
    }

    public String getEngineNumber() {
        return engineNumber;
    }

    public void setEngineNumber(String engineNumber) {
        this.engineNumber = engineNumber;
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

    public String getLegalBrandName() {
        return legalBrandName;
    }

    public void setLegalBrandName(String legalBrandName) {
        this.legalBrandName = legalBrandName;
    }

    public int getYearManufacture() {
        return yearManufacture;
    }

    public void setYearManufacture(int yearManufacture) {
        this.yearManufacture = yearManufacture;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getTransmission() {
        return transmission;
    }

    public void setTransmission(String transmission) {
        this.transmission = transmission;
    }

    public String getTraction() {
        return traction;
    }

    public void setTraction(String traction) {
        this.traction = traction;
    }

    public String getBodyWork() {
        return bodyWork;
    }

    public void setBodyWork(String bodyWork) {
        this.bodyWork = bodyWork;
    }

    public String getEngineSize() {
        return engineSize;
    }

    public void setEngineSize(String engineSize) {
        this.engineSize = engineSize;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public boolean isStockStatus() {
        return stockStatus;
    }

    public void setStockStatus(boolean stockStatus) {
        this.stockStatus = stockStatus;
    }

    public Integer getIdSupplier() {
        return idSupplier;
    }

    public void setIdSupplier(Integer idSupplier) {
        this.idSupplier = idSupplier;
    }
}
