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

@Entity
@Table(name = "catalogs")
public class Catalog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //genera el id
    @Column(name = "id_Catalog")
    private int idCatalog;
    
    @Column(name = "car_name")
    private String carName;
    
    @Column(name = "brand_name")
    private String brandName;
    
    @Column(name = "body_work")
    private String bodyWork;
    
    @Column(name = "technical_description")
    private String technicalDescription;
    
    @Column(name = "base_price")
    private double basePrice;
    
    @Column(name = "image")
    private String image;
    
    @Column(name = "year_manufacture")
    private int yearManufacture;   
        
    @Column(name = "transmission")
    private  String transmission;
    
    @Column(name = "fuel_type")
    private String fuelType;
    
    @Column(name = "engine_size")
    private String engineSize;

    @Column(name = "is_active")
    private boolean isActive = true;

    public int getYearManufacture() {
        return yearManufacture;
    }

    public void setYearManufacture(int yearManufacture) {
        this.yearManufacture = yearManufacture;
    }

    public String getTransmission() {
        return transmission;
    }

    public void setTransmission(String transmission) {
        this.transmission = transmission;
    }

    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public String getEngineSize() {
        return engineSize;
    }

    public void setEngineSize(String engineSize) {
        this.engineSize = engineSize;
    }

    public int getIdCatalog() {
        return idCatalog;
    }

    public void setIdCatalog(int idCatalog) {
        this.idCatalog = idCatalog;
    }

    public String getCarName() {
        return carName;
    }

    public void setCarName(String carName) {
        this.carName = carName;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getBodyWork() {
        return bodyWork;
    }

    public void setBodyWork(String bodyWork) {
        this.bodyWork = bodyWork;
    }

    public String getTechnicalDescription() {
        return technicalDescription;
    }

    public void setTechnicalDescription(String technicalDescription) {
        this.technicalDescription = technicalDescription;
    }

    public double getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(double basePrice) {
        this.basePrice = basePrice;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public boolean isIsActive() {
        return isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }

}
