package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.domain.Role;
import cr.ac.ucr.ie.fast506.repository.RoleRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    
    @Autowired
    private RoleRepository roleRepository;
    
    public List<Role> getAll() {
        
        return roleRepository.getAllRoles();
        
    }
    
    public void add(Role role) {
        
        role.setCreateDate(LocalDate.now());
        valideateRole(role);
        role.setIsActive(true);
        roleRepository.save(role);
        
    }
    
    public void delete(Integer id_Role) {
        
        roleRepository.deleteRole(id_Role);
        
    }
    
    public void update(Role role) {
        
        valideateRole(role);
        role.setIsActive(true);
        roleRepository.save(role);
        
    }
    
    private void valideateRole(Role role) {
        
        if (role.getName() == null || role.getName().isEmpty() || role.getName().length() > 50) {
            throw new IllegalArgumentException("El nombre del rol no puede ser nulo o vacío y debe contener maximo 50 caracteres");
        }
        
        if (role.getDescription() == null || role.getDescription().isEmpty()) {
            throw new IllegalArgumentException("La descripción del rol no puede ser nula o vacía");
        }
        
        if (role.getCreateDate() == null || role.getCreateDate().isAfter(LocalDate.now())) {
            
            throw new IllegalArgumentException("La fecha de creación del rol no puede ser nula o futura");
        }
        
        if (role.getLevelHierarchy() == null || role.getLevelHierarchy() < 1 || role.getLevelHierarchy() > 10) {
            throw new IllegalArgumentException("El nivel de jerarquía del rol debe ser entre 1 y 10");
        }
        
    }
    
}
