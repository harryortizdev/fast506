package cr.ac.ucr.ie.fast506.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "permissions")
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Permissions")
    private Integer idPermissions;

    @Column(name = "id_role")
    private Integer idRole;

    @Column(name = "id_Module")
    private String idModule;

    @Column(name = "create_Permission")
    private Boolean createPermission;

    @Column(name = "read_Permission")
    private Boolean readPermission;

    @Column(name = "update_Permission")
    private Boolean updatePermission;

    @Column(name = "delete_Permission")
    private Boolean deletePermission;

    @Column(name = "is_Active")
    private Boolean isActive;

    public Integer getIdPermissions() {
        return idPermissions;
    }

    public void setIdPermissions(Integer idPermissions) {
        this.idPermissions = idPermissions;
    }

    public Integer getIdRole() {
        return idRole;
    }

    public void setIdRole(Integer idRole) {
        this.idRole = idRole;
    }

    public String getIdModule() {
        return idModule;
    }

    public void setIdModule(String idModule) {
        this.idModule = idModule;
    }

    public Boolean getCreatePermission() {
        return createPermission;
    }

    public void setCreatePermission(Boolean createPermission) {
        this.createPermission = createPermission;
    }

    public Boolean getReadPermission() {
        return readPermission;
    }

    public void setReadPermission(Boolean readPermission) {
        this.readPermission = readPermission;
    }

    public Boolean getUpdatePermission() {
        return updatePermission;
    }

    public void setUpdatePermission(Boolean updatePermission) {
        this.updatePermission = updatePermission;
    }

    public Boolean getDeletePermission() {
        return deletePermission;
    }

    public void setDeletePermission(Boolean deletePermission) {
        this.deletePermission = deletePermission;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
}
