/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package cr.ac.ucr.ie.fast506.controller;

import cr.ac.ucr.ie.fast506.domain.Client;
import cr.ac.ucr.ie.fast506.domain.Testdrive;
import cr.ac.ucr.ie.fast506.domain.Unit;
import cr.ac.ucr.ie.fast506.service.TestdriveService;
import java.time.LocalDate;
import java.util.List;
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

/**
 *
 * @author ediso
 */
@RestController
@RequestMapping("/api/testdrive")
public class TestdriveController {

    @Autowired
    private TestdriveService testdriveService;

    @GetMapping("/all")
    public List<Testdrive> getAll() {
        return testdriveService.getAll();
    }

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody Testdrive testdrive) {
        try {
            testdriveService.add(testdrive);
            return ResponseEntity.ok("Tesdrive agendado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al guardar: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody Testdrive testdrive) {
        try {
            testdriveService.update(testdrive);
            return ResponseEntity.ok("Testdrive actualizado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al actualizar: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam int id) {
        try {
            testdriveService.deleteById(id);
            return ResponseEntity.ok("Tesdrive eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al eliminar: " + e.getMessage());
        }
    }

    @GetMapping("/occupied-hours")
public ResponseEntity<List<String>> getOccupiedHours(
        @RequestParam("date") String dateS,
        @RequestParam("idBranch") Integer idBranch) {
    try {
        LocalDate date = LocalDate.parse(dateS);

        List<String> occupiedHours = testdriveService.getOccupiedHoursByDate(date, idBranch);
        
        return ResponseEntity.ok(occupiedHours);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}

    @GetMapping("/search")
    public ResponseEntity<Client> searchByIdentity(@RequestParam("id") int id) {
        Client client = testdriveService.findByIdentity(id);
        if (client != null) {
            return ResponseEntity.ok(client);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/allCarAvailable")
    public List<Unit> allCarAvailable() {
        return testdriveService.allCarAvailable();
    }
}
