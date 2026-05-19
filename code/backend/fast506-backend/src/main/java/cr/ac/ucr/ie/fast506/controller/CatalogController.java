/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package cr.ac.ucr.ie.fast506.controller;

import cr.ac.ucr.ie.fast506.domain.Catalog;
import cr.ac.ucr.ie.fast506.service.CatalogService;
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


@RestController
@RequestMapping("/api/catalogs")
public class CatalogController {
     @Autowired
    private CatalogService catalogService;

    @GetMapping("/all")
    public List<Catalog> getAll() {
        return catalogService.getAll();
    }

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody Catalog catalog) {
        try {
            catalogService.add(catalog);
            return ResponseEntity.ok("Unidad guardada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al guardar: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam int id) {
        try {
            catalogService.deleteById(id);
            return ResponseEntity.ok("Unidad eliminada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al eliminar: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody Catalog catalog) {
        try {
            catalogService.update(catalog);
            return ResponseEntity.ok("Unidad actualizada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al actualizar: " + e.getMessage());
        }
    }
}
