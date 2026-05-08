package cr.ac.ucr.ie.fast506.domain;


public class Supplier {

    private int idSupplier;
    private String name;
    private String companyName;
    private String legalName;
    private String supportPhone;
    private String bussinesContactName;
    private String email;
    private String ubicacion;
    private boolean isActive;
    private int adminId;

    public Supplier(int idSupplier, String name, String companyName, String legalName, 
                    String supportPhone, String bussinesContactName, String email, 
                    String ubicacion, boolean isActive, int adminId) {
        this.idSupplier = idSupplier;
        this.name = name;
        this.companyName = companyName;
        this.legalName = legalName;
        this.supportPhone = supportPhone;
        this.bussinesContactName = bussinesContactName;
        this.email = email;
        this.ubicacion = ubicacion;
        this.isActive = isActive;
        this.adminId = adminId;
    }

     public Supplier(){}

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