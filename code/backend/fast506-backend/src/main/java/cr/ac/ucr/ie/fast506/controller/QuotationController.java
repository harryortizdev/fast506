/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package cr.ac.ucr.ie.fast506.controller;

import cr.ac.ucr.ie.fast506.domain.Quotation;
import cr.ac.ucr.ie.fast506.domain.Unit;
import cr.ac.ucr.ie.fast506.service.QuotationService;
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
@RequestMapping("/api/quotation")
public class QuotationController {

    @Autowired
    private QuotationService quotationService;

    @GetMapping("/all")
    public List<Quotation> getAll() {
        return quotationService.getAll();
    }

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody Quotation quotation) {
        try {
            quotationService.add(quotation);
            return ResponseEntity.ok("Cotización guardada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al guardar: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody Quotation quotation) {
        try {
            quotationService.update(quotation);
            return ResponseEntity.ok("Cotización actualizada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al actualizar: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam int id) {
        try {
            quotationService.deleteById(id);
            return ResponseEntity.ok("Sucursal eliminada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al eliminar: " + e.getMessage());
        }
    }

    @GetMapping("/filteredUnitsByCatalog")
    public List<Unit> filteredUnitsByCatalog(@RequestParam int idCatalog) {
        return quotationService.filteredUnitsByCatalog(idCatalog);
    }
}
