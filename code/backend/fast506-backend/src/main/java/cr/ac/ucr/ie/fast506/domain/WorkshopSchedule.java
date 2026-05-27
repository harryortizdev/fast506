package cr.ac.ucr.ie.fast506.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.sql.Date;

@Entity
@Table(name = "workshop_schedule")
public class WorkshopSchedule {

    @Id
    @Column(name = "id_appointment")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idAppointment;

    @Column(name = "number_reference")
    private int numberReference;

    @Column(name = "license_plate")
    private String licensePlate;

    @Column(name = "entry_date")
    private Date entryDate;

    @Column(name = "reason_service")
    private String reasonService;

    @Column(name = "reception_mileage")
    private int receptionMileage;

    @Column(name = "id_client")
    private int idClient;

    @Column(name = "id_branch")
    private int idBranch;

    @Column(name = "is_active")
    private boolean isActive;

    public WorkshopSchedule() {
    }


    public int getIdAppointment() {
        return idAppointment;
    }

    public void setIdAppointment(int idAppointment) {
        this.idAppointment = idAppointment;
    }

    public int getNumberReference() {
        return numberReference;
    }

    public void setNumberReference(int numberReference) {
        this.numberReference = numberReference;
    }

    public String getLicensePlate() {
        return licensePlate;
    }

    public void setLicensePlate(String licensePlate) {
        this.licensePlate = licensePlate;
    }

    public Date getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(Date entryDate) {
        this.entryDate = entryDate;
    }

    public String getReasonService() {
        return reasonService;
    }

    public void setReasonService(String reasonService) {
        this.reasonService = reasonService;
    }

    public int getReceptionMileage() {
        return receptionMileage;
    }

    public void setReceptionMileage(int receptionMileage) {
        this.receptionMileage = receptionMileage;
    }

    public int getIdClient() {
        return idClient;
    }

    public void setIdClient(int idClient) {
        this.idClient = idClient;
    }

    public int getIdBranch() {
        return idBranch;
    }

    public void setIdBranch(int idBranch) {
        this.idBranch = idBranch;
    }

    public boolean isIsActive() {
        return isActive;
    }

    public void setIsActive(boolean isActive) {
        this.isActive = isActive;
    }
}