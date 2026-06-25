package cr.ac.ucr.ie.fast506.controller;

import cr.ac.ucr.ie.fast506.domain.Mechanic;
import cr.ac.ucr.ie.fast506.service.MechanicService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/mechanics")
public class MechanicController {

    @Autowired
    private MechanicService mechanicService;

    @GetMapping("/all")
    public List<Mechanic> getAll() {
        return mechanicService.getAll();
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
            @RequestParam(value = "specialty", required = false) String specialty,
            @RequestParam(value = "certLevel", required = false) String certLevel,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage
    ) {
        try {
            mechanicService.add(name, id, email, password, phoneNumber, dateBirth, isActive, idRole, employeeId, corporateEmail, specialty, certLevel, profileImage);
            return ResponseEntity.ok("Mecanico registrado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al registrar el mecanico " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam int id) {
        try {
            mechanicService.deleteById(id);
            return ResponseEntity.ok("Mecanico eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al eliminar el mecanico " + e.getMessage());
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
            @RequestParam(value = "specialty", required = false) String specialty,
            @RequestParam(value = "certLevel", required = false) String certLevel,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage
    ) {
        try {
            mechanicService.update(idUser, name, id, email, password, phoneNumber, dateBirth, isActive, idRole, employeeId, corporateEmail, specialty, certLevel, profileImage);
            return ResponseEntity.ok("Mecanico actualizado correctamente");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al actualizar el mecanico " + e.getMessage());
        }
    }

}
