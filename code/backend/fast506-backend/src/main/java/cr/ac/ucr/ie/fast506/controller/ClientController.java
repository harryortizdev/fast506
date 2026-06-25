package cr.ac.ucr.ie.fast506.controller;

import cr.ac.ucr.ie.fast506.domain.Client;
import cr.ac.ucr.ie.fast506.service.ClientService;
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
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/all")
    public List<Client> getAll() {
        return clientService.getAll();
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> add(
            @RequestParam("name") String name,
            @RequestParam("id") int id,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
            @RequestParam("dateBirth") String dateBirth,
            @RequestParam(value = "isActive", required = false, defaultValue = "true") boolean isActive,
            @RequestParam(value = "idRole", required = false) Integer idRole,
            @RequestParam(value = "commInterest", required = false) String commInterest,
            @RequestParam(value = "physicalAddress", required = false) String physicalAddress,
            @RequestParam(value = "occupation", required = false) String occupation,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage
    ) {
        try {
            clientService.add(name, id, email, password, phoneNumber, dateBirth, isActive, idRole, commInterest, physicalAddress, occupation, profileImage);
            return ResponseEntity.ok("Cliente registrado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al registrar cliente " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam int id) {
        try {
            clientService.deleteById(id);
            return ResponseEntity.ok("Cliente eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al eliminar cliente " + e.getMessage());
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
            @RequestParam(value = "commInterest", required = false) String commInterest,
            @RequestParam(value = "physicalAddress", required = false) String physicalAddress,
            @RequestParam(value = "occupation", required = false) String occupation,
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage
    ) {
        try {
            clientService.update(idUser, name, id, email, password, phoneNumber, dateBirth, isActive, idRole, commInterest, physicalAddress, occupation, profileImage);
            return ResponseEntity.ok("Cliente actualizado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al actualizar cliente " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        Client client = clientService.findByEmailAndPassword(email, password);

        if (client == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
        return ResponseEntity.ok(client);
    }

}
