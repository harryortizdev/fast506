package cr.ac.ucr.ie.fast506.controller;

import cr.ac.ucr.ie.fast506.domain.Client;
import cr.ac.ucr.ie.fast506.service.ClientService;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("/all")

    public List<Client> getAll() {

        return clientService.getAll();

    }

    @PostMapping("/create")

    public ResponseEntity<String> add(@RequestBody Client client) {

        try {

            clientService.add(client);

            return ResponseEntity.ok("Cliente registrado correctamente ");

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

    @PutMapping("/update")

    public ResponseEntity<String> update(@RequestBody Client client) {

        try {

            clientService.update(client);
            return ResponseEntity.ok("Cliente actualizado correctamente");

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al actualizar cliente " + e.getMessage());

        }

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");

        Client admin = clientService.findByEmailAndPassword(email, password);

        if (admin == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
        return ResponseEntity.ok(admin);
    }

}
