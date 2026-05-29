package cr.ac.ucr.ie.fast506.controller;

import cr.ac.ucr.ie.fast506.domain.WorkshopSchedule;
import cr.ac.ucr.ie.fast506.service.WorkshopScheduleService;
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
@RequestMapping("/api/workshopSchedules")
public class WorkshopScheduleController {

    @Autowired
    private WorkshopScheduleService workshopScheduleService;

    @GetMapping("/all")
    public List<WorkshopSchedule> getAll() {
        return workshopScheduleService.getAll();
    }

    @PostMapping("/create")
    public ResponseEntity<String> create(
            @RequestBody WorkshopSchedule workshopSchedule) {

        try {
            workshopScheduleService.add(workshopSchedule);

            return ResponseEntity.ok(
                    "Cita de taller guardada correctamente");

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Error al guardar: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam int id) {

        try {
            workshopScheduleService.deleteById(id);

            return ResponseEntity.ok(
                    "Cita de taller eliminada correctamente");

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Error al eliminar: " + e.getMessage());
        }
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(
            @RequestBody WorkshopSchedule workshopSchedule) {

        try {
            workshopScheduleService.update(workshopSchedule);

            return ResponseEntity.ok(
                    "Cita de taller actualizada correctamente");

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Error al actualizar: " + e.getMessage());
        }
    }

    @GetMapping("/allForReports")
    public List<WorkshopSchedule> getAllForReports() {
        return workshopScheduleService.getAllForReports();
    }
}
