package cr.ac.ucr.ie.fast506.controller;

import cr.ac.ucr.ie.fast506.domain.RepairReport;
import cr.ac.ucr.ie.fast506.service.RepairReportService;
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
@RequestMapping("/api/repairReports")
public class RepairReportController {

    @Autowired
    private RepairReportService repairReportService;

    @GetMapping("/all")
    public List<RepairReport> getAll() {
        return repairReportService.getAll();
    }

    @PostMapping("/create")
    public ResponseEntity<String> create(
            @RequestBody RepairReport repairReport) {

        try {
            repairReportService.add(repairReport);

            return ResponseEntity.ok(
                    "Reporte de reparación guardado correctamente");

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Error al guardar: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam int id) {

        try {
            repairReportService.deleteById(id);

            return ResponseEntity.ok(
                    "Reporte de reparación eliminado correctamente");

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Error al eliminar: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(
            @RequestBody RepairReport repairReport) {

        try {
            repairReportService.update(repairReport);

            return ResponseEntity.ok(
                    "Reporte de reparación actualizado correctamente");

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Error al actualizar: " + e.getMessage());
        }
    }
}