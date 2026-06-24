package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.domain.Permission;
import cr.ac.ucr.ie.fast506.repository.PermissionRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PermissionService {

    @Autowired
    private PermissionRepository permissionRepository;

    public List<Permission> getByRole(Integer idRole) {
        return permissionRepository.getPermissionsByRole(idRole);
    }

    @Transactional
    public void savePermissions(Integer idRole, List<Permission> permissions) {
        permissionRepository.deletePermissionsByRole(idRole);
        for (Permission p : permissions) {
            permissionRepository.savePermissionByRole(
                    idRole,
                    p.getIdModule(),
                    Boolean.TRUE.equals(p.getCreatePermission()),
                    Boolean.TRUE.equals(p.getReadPermission()),
                    Boolean.TRUE.equals(p.getUpdatePermission()),
                    Boolean.TRUE.equals(p.getDeletePermission())
            );
        }
    }
}
