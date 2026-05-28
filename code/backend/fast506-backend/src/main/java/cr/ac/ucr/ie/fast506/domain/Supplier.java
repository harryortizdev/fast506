package cr.ac.ucr.ie.fast506.domain;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "supplier")
public class Supplier implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_supplier")
    private int idSupplier;

    @Column(name = "name")
    private String name;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "legal_name")
    private String legalName;

    @Column(name = "support_phone")
    private String supportPhone;

    @Column(name = "bussines_contact_name")
    private String bussinesContactName;

    @Column(name = "email")
    private String email;

    @Column(name = "ubicacion")
    private String ubicacion;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "admin_id")
    private int adminId;

    
    
    public int getIdSupplier() {
        return idSupplier;
    }

    public void setIdSupplier(int idSupplier) {
        this.idSupplier = idSupplier;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getLegalName() {
        return legalName;
    }

    public void setLegalName(String legalName) {
        this.legalName = legalName;
    }

    public String getSupportPhone() {
        return supportPhone;
    }

    public void setSupportPhone(String supportPhone) {
        this.supportPhone = supportPhone;
    }

    public String getBussinesContactName() {
        return bussinesContactName;
    }

    public void setBussinesContactName(String bussinesContactName) {
        this.bussinesContactName = bussinesContactName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }

    public int getAdminId() {
        return adminId;
    }

    public void setAdminId(int adminId) {
        this.adminId = adminId;
    }
}