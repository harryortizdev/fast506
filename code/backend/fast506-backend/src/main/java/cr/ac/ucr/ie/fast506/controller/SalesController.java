/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package cr.ac.ucr.ie.fast506.controller;

import cr.ac.ucr.ie.fast506.domain.Sales;
import cr.ac.ucr.ie.fast506.domain.Unit;
import cr.ac.ucr.ie.fast506.service.SalesService;
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
 * @author Harry Ortiz
 */
@RestController
@RequestMapping("/api/sales")
public class SalesController {
    
    @Autowired
    private SalesService salesService;
    
    @GetMapping("/all")
    public List<Sales> getAll() {
        return salesService.getAll();
    }
    
     @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody Sales sales) {
        try {
            salesService.add(sales);
            return ResponseEntity.ok("Venta guardada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al guardar: " + e.getMessage());
        }
    }
    
     @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody Sales sales) {
        try {
            salesService.update(sales);
            return ResponseEntity.ok("Venta actualizada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al actualizar: " + e.getMessage());
        }
    }
    
     @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam int id) {
        try {
            salesService.deleteById(id);
            return ResponseEntity.ok("Unidad eliminada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al eliminar: " + e.getMessage());
        }
    }
    
    @GetMapping("/filteredUnitsByCatalog")
    public List<Unit> filteredUnitsByCatalog(@RequestParam int idCatalog) {
        return salesService.filteredUnitsByCatalog(idCatalog);
    }
}
