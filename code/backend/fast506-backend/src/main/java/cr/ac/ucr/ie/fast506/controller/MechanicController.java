package cr.ac.ucr.ie.fast506.controller;

import cr.ac.ucr.ie.fast506.domain.Mechanic;
import cr.ac.ucr.ie.fast506.service.MechanicService;
import java.util.LinkedList;
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
@RequestMapping("/api/mechanics")
public class MechanicController {

    @Autowired
    private MechanicService mechanicService;

    @GetMapping("/all")

    public LinkedList<Mechanic> getAll() {

        return mechanicService.getAll();

    }

    @PostMapping("/create")

    public ResponseEntity<String> create(@RequestBody Mechanic mechanic) {

        try {

            mechanicService.add(mechanic);
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

            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error el eliminar el mecnaico " + e.getMessage());

        }

    }

    @PutMapping("/update")

    public ResponseEntity<String> update(@RequestBody Mechanic mechanic) {

        try {

            mechanicService.update(mechanic);
            return ResponseEntity.ok("Mecanico actualiazado correctamente");

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al actualizar el mecanico " + e.getMessage());

        }

    }

}
