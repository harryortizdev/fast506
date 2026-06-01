package cr.ac.ucr.ie.fast506.controller;

import cr.ac.ucr.ie.fast506.domain.Role;
import cr.ac.ucr.ie.fast506.service.RoleService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping("/all")
    public List<Role> getAll() {
        return roleService.getAll();
    }

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody Role role) {
        try {
            System.out.println(role);
            roleService.add(role);
            return ResponseEntity.ok("Rol creado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al crear el rol " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam int idRole) {

        try {
            roleService.delete(idRole);
            return ResponseEntity.ok("Rol eliminado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al eliminar el rol " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody Role role) {
        try {
            roleService.update(role);
            return ResponseEntity.ok("Rol actualizado exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al actualizar el rol " + e.getMessage());
        }
    }

}
