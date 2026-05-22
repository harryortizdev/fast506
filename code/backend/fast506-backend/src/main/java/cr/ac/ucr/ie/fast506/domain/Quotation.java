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
import java.time.LocalDate;

/**
 *
 * @author ediso
 */
@Entity
@Table(name = "quotation")
public class Quotation {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Quotation")
    private int idQuotation;
        
    @Column(name = "reference_Number")
    private int referenceNumber;
    
    @Column(name = "date")
    private LocalDate date;
    
    @Column(name = "initial_Price")
    private double initialPrice;
    
    @Column(name = "transfer_Cost")
    private double transferCost;
    
    @Column(name = "sales_Tax")
    private double salesTax;
    
    @Column(name = "total_Payment")
    private double totalPayment;
    
    @Column(name = "is_Active")
    private boolean isActive;
    
    @Column(name = "id_user")
    private int idUser;
    
    @Column(name = "id_catalog")
    private int idCatalog;
    
    @Column(name = "id_car")
    private int idCar;

    public int getIdQuotation() {
        return idQuotation;
    }

    public void setIdQuotation(int idQuotation) {
        this.idQuotation = idQuotation;
    }

    public int getReferenceNumber() {
        return referenceNumber;
    }

    public void setReferenceNumber(int referenceNumber) {
        this.referenceNumber = referenceNumber;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public double getInitialPrice() {
        return initialPrice;
    }

    public void setInitialPrice(double initialPrice) {
        this.initialPrice = initialPrice;
    }

    public double getTransferCost() {
        return transferCost;
    }

    public void setTransferCost(double transferCost) {
        this.transferCost = transferCost;
    }

    public double getSalesTax() {
        return salesTax;
    }

    public void setSalesTax(double salesTax) {
        this.salesTax = salesTax;
    }

    public double getTotalPayment() {
        return totalPayment;
    }

    public void setTotalPayment(double totalPayment) {
        this.totalPayment = totalPayment;
    }

    public boolean isIsActive() {
        return isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }

    public int getIdUser() {
        return idUser;
    }

    public void setIdUser(int idUser) {
        this.idUser = idUser;
    }

    public int getIdCatalog() {
        return idCatalog;
    }

    public void setIdCatalog(int idCatalog) {
        this.idCatalog = idCatalog;
    }

    public int getIdCar() {
        return idCar;
    }

    public void setIdCar(int idCar) {
        this.idCar = idCar;
    }

    
    
    
}

