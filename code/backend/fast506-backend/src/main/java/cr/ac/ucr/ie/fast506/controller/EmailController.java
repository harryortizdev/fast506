/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package cr.ac.ucr.ie.fast506.controller;

import cr.ac.ucr.ie.fast506.domain.Quotation;
import cr.ac.ucr.ie.fast506.domain.Sales;
import cr.ac.ucr.ie.fast506.domain.Testdrive;
import cr.ac.ucr.ie.fast506.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author ediso
 */
@RestController
@RequestMapping("/api/email")
public class EmailController {

    @Autowired
    EmailService emailService;

    @PostMapping("/quotation")
    public ResponseEntity<String> create(@RequestBody Quotation quotation) {
        try {
            emailService.sendQuotation(quotation);
            return ResponseEntity.ok("Correo de cotización enviado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al enviar: " + e.getMessage());
        }
    }
    
    @PostMapping("/testdrive")
    public ResponseEntity<String> create(@RequestBody Testdrive testdrive) {
        try {
            emailService.sendTestdrive(testdrive);
            return ResponseEntity.ok("Correo de testdrive enviado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al enviar: " + e.getMessage());
        }
    }
    
     @PostMapping("/sales")
    public ResponseEntity<String> create(@RequestBody Sales sales) {
        try {
            emailService.sendSales(sales);
            return ResponseEntity.ok("Correo de venta enviado");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al enviar: " + e.getMessage());
        }
    }
}
