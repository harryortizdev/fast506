package cr.ac.ucr.ie.fast506.controller;

import cr.ac.ucr.ie.fast506.domain.Supplier;
import cr.ac.ucr.ie.fast506.service.SupplierService;
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
@RequestMapping("/api/suppliers")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @GetMapping("/all")
    public LinkedList<Supplier> getAll() {
        return supplierService.getAll();
    }

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody Supplier supplier) {
        try {
            supplierService.add(supplier);
            return ResponseEntity.ok("Proveedor guardado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al guardar: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam int id) {
        try {
            supplierService.deleteById(id);
            return ResponseEntity.ok("Proveedor eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al eliminar: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody Supplier supplier) {
        try {
            supplierService.update(supplier);
            return ResponseEntity.ok("Proveedor actualizado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al actualizar: " + e.getMessage());
        }
    }

}