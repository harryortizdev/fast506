package cr.ac.ucr.ie.fast506.controller;

import cr.ac.ucr.ie.fast506.domain.Administrator;
import cr.ac.ucr.ie.fast506.service.AdministratorService;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admins")
public class AdministratorController {

    @Autowired
    private AdministratorService adminService;

    @GetMapping("/all")
    public List<Administrator> getAll() {
        return adminService.getAll();
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> create(
            @RequestParam("name") String name,
            @RequestParam("id") int id,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
            @RequestParam("dateBirth") String dateBirth,
            @RequestParam(value = "isActive", required = false, defaultValue = "true") boolean isActive,
            @RequestParam(value = "idRole", required = false) Integer idRole,
            @RequestParam("employeeId") String employeeId,
            @RequestParam(value = "corporateEmail", required = false) String corporateEmail,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage
    ) {
        try {
            adminService.add(name, id, email, password, phoneNumber, dateBirth, isActive, idRole, employeeId, corporateEmail, profileImage);
            return ResponseEntity.ok("Administrador registrado con exito");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al registrar el administrador " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam int id) {
        try {
            adminService.deleteById(id);
            return ResponseEntity.ok("Administrador eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al eliminar el administrador " + e.getMessage());
        }
    }

    @PutMapping(value = "/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> update(
            @RequestParam("idUser") int idUser,
            @RequestParam("name") String name,
            @RequestParam("id") int id,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
            @RequestParam("dateBirth") String dateBirth,
            @RequestParam(value = "isActive", required = false, defaultValue = "true") boolean isActive,
            @RequestParam(value = "idRole", required = false) Integer idRole,
            @RequestParam("employeeId") String employeeId,
            @RequestParam(value = "corporateEmail", required = false) String corporateEmail,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage
    ) {
        try {
            adminService.update(idUser, name, id, email, password, phoneNumber, dateBirth, isActive, idRole, employeeId, corporateEmail, profileImage);
            return ResponseEntity.ok("Administrador actualizado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("No se pudo actualizar el administrador " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        Administrator admin = adminService.findByEmailAndPassword(email, password);

        if (admin == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
        return ResponseEntity.ok(admin);
    }

}
