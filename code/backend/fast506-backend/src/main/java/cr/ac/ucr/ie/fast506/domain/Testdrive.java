/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "testdrive")
public class Testdrive {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Test")
    private int idTest;

    @Column(name = "number_Reference") 
    private int numberReference;

    @Column(name = "creation_Date") 
    private LocalDate creationDate;

    @Column(name = "scheduled_Date") 
    private LocalDate scheduledDate;

    @Column(name = "initiation_Time")
    private LocalTime initiationTime;

    @Column(name = "finalization_Time") 
    private LocalTime finalizationTime;

    @Column(name = "status_Appointment") 
    private String statusAppointment;

    @Column(name = "is_Active")
    private boolean isActive;

    @Column(name = "id_user") 
    private int idUser;

    @Column(name = "id_car") 
    private int idCar;

    @Column(name = "id_branch")
    private int idBranch;

    public Testdrive() {
    }

    public int getIdTest() {
        return idTest;
    }

    public void setIdTest(int idTest) {
        this.idTest = idTest;
    }

    public int getNumberReference() {
        return numberReference;
    }

    public void setNumberReference(int numberReference) {
        this.numberReference = numberReference;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getScheduledDate() {
        return scheduledDate;
    }

    public void setScheduledDate(LocalDate scheduledDate) {
        this.scheduledDate = scheduledDate;
    }

    public LocalTime getInitiationTime() {
        return initiationTime;
    }

    public void setInitiationTime(LocalTime initiationTime) {
        this.initiationTime = initiationTime;
    }

    public LocalTime getFinalizationTime() {
        return finalizationTime;
    }

    public void setFinalizationTime(LocalTime finalizationTime) {
        this.finalizationTime = finalizationTime;
    }

    public String getStatusAppointment() {
        return statusAppointment;
    }

    public void setStatusAppointment(String statusAppointment) {
        this.statusAppointment = statusAppointment;
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

    public int getIdCar() {
        return idCar;
    }

    public void setIdCar(int idCar) {
        this.idCar = idCar;
    }

    public int getIdBranch() {
        return idBranch;
    }

    public void setIdBranch(int idBranch) {
        this.idBranch = idBranch;
    }    
    
}
