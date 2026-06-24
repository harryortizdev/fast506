package cr.ac.ucr.ie.fast506.controller;

import cr.ac.ucr.ie.fast506.domain.ModuleType;
import cr.ac.ucr.ie.fast506.domain.Permission;
import cr.ac.ucr.ie.fast506.service.PermissionService;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PermissionController {

    @Autowired
    private PermissionService permissionService;

    @GetMapping("/modules")
    public List<Map<String, String>> getModules() {
        return Arrays.stream(ModuleType.values())
                .map(m -> Map.of("id", m.getId(), "name", m.getName()))
                .collect(Collectors.toList());
    }

    @GetMapping("/permissions/role/{id}")
    public List<Permission> getByRole(@PathVariable Integer id) {
        return permissionService.getByRole(id);
    }

    @PutMapping("/permissions/role/{id}")
    public ResponseEntity<String> savePermissions(
            @PathVariable Integer id,
            @RequestBody List<Permission> permissions) {
        try {
            permissionService.savePermissions(id, permissions);
            return ResponseEntity.ok("Permisos guardados exitosamente");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al guardar los permisos: " + e.getMessage());
        }
    }
}
