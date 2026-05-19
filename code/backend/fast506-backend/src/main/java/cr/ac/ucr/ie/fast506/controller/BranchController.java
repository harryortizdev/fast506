/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package cr.ac.ucr.ie.fast506.controller;

import cr.ac.ucr.ie.fast506.domain.Branch;
import cr.ac.ucr.ie.fast506.service.BranchService;
import java.util.LinkedList;
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
@RequestMapping("/api/branch")
public class BranchController {
    
    @Autowired
    private BranchService branchService;
    
    @GetMapping("/all")
    public List<Branch> getAll() {
        return branchService.getAll();
    }
    
    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody Branch branch) {
        try {
            branchService.add(branch);
            return ResponseEntity.ok("Sucursal guardada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al guardar: " + e.getMessage());
        }
    }
    
    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody Branch branch) {
        try {
            branchService.update(branch);
            return ResponseEntity.ok("Sucursal actualizada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al actualizar: " + e.getMessage());
        }
    }
    
    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam int id) {
        try {
            branchService.deleteById(id);
            return ResponseEntity.ok("Sucursal eliminada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al eliminar: " + e.getMessage());
        }
    }
}