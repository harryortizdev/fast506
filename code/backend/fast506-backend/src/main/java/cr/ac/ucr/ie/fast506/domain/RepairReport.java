package cr.ac.ucr.ie.fast506.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.sql.Date;

@Entity
@Table(name = "repair_reports")
public class RepairReport {

    @Id
    @Column(name = "id_reparation")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idReparation;

    @Column(name = "number_reference")
    private int numberReference;

    @Column(name = "technical_diagnosis")
    private String technicalDiagnosis;

    @Column(name = "spare_parts")
    private String spareParts;

    @Column(name = "observations")
    private String observations;

    @Column(name = "cost")
    private double cost;

    @Column(name = "taxes")
    private double taxes;

    @Column(name = "total_payment")
    private double totalPayment;

    @Column(name = "completion_date")
    private Date completionDate;

    @Column(name = "id_mechanic")
    private int idMechanic;

    @Column(name = "is_active")
    private boolean isActive;


    public int getIdReparation() {
        return idReparation;
    }

    public void setIdReparation(int idReparation) {
        this.idReparation = idReparation;
    }

    public int getNumberReference() {
        return numberReference;
    }

    public void setNumberReference(int numberReference) {
        this.numberReference = numberReference;
    }

    public String getTechnicalDiagnosis() {
        return technicalDiagnosis;
    }

    public void setTechnicalDiagnosis(String technicalDiagnosis) {
        this.technicalDiagnosis = technicalDiagnosis;
    }

    public String getSpareParts() {
        return spareParts;
    }

    public void setSpareParts(String spareParts) {
        this.spareParts = spareParts;
    }

    public String getObservations() {
        return observations;
    }

    public void setObservations(String observations) {
        this.observations = observations;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public double getTaxes() {
        return taxes;
    }

    public void setTaxes(double taxes) {
        this.taxes = taxes;
    }

    public double getTotalPayment() {
        return totalPayment;
    }

    public void setTotalPayment(double totalPayment) {
        this.totalPayment = totalPayment;
    }

    public Date getCompletionDate() {
        return completionDate;
    }

    public void setCompletionDate(Date completionDate) {
        this.completionDate = completionDate;
    }

    public int getIdMechanic() {
        return idMechanic;
    }

    public void setIdMechanic(int idMechanic) {
        this.idMechanic = idMechanic;
    }

    public boolean isIsActive() {
        return isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }
}