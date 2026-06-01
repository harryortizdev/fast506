package cr.ac.ucr.ie.fast506.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Role")
    private Integer idRole;

    @Column(name = "role_Name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "create_Date")
    private LocalDate createDate;

    @Column(name = "level_Hierarchy")
    private Integer levelHierarchy;

    @Column(name = "is_Worker")
    private Boolean isWorker;

    @Column(name = "have_Email")
    private Boolean haveEmail;

    @Column(name = "is_Active")
    private Boolean isActive;

    public Integer getIdRole() {
        return idRole;
    }

    public void setIdRole(Integer idRole) {
        this.idRole = idRole;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public Integer getLevelHierarchy() {
        return levelHierarchy;
    }

    public void setLevelHierarchy(Integer levelHierarchy) {
        this.levelHierarchy = levelHierarchy;
    }

    public Boolean getIsWorker() {
        return isWorker;
    }

    public void setIsWorker(Boolean isWorker) {
        this.isWorker = isWorker;
    }

    public Boolean getHaveEmail() {
        return haveEmail;
    }

    public void setHaveEmail(Boolean haveEmail) {
        this.haveEmail = haveEmail;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    @Override
    public String toString() {
        return "Role{" + "idRole=" + idRole + ", name=" + name + ", description=" + description + ", createDate=" + createDate + ", levelHierarchy=" + levelHierarchy + ", isWorker=" + isWorker + ", haveEmail=" + haveEmail + ", isActive=" + isActive + '}';
    }

    
    
}
