package cr.ac.ucr.ie.fast506.controller;

import cr.ac.ucr.ie.fast506.domain.Ad;
import cr.ac.ucr.ie.fast506.service.AdService;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/ad")
public class AdController {

    @Autowired
    AdService adService;

    @GetMapping("/all")
    public List<Ad> getAll() {
        return adService.getAll();
    }
    @GetMapping("/allBranch")
    public List<Ad> getAllBranch() {
        return adService.getAllBranch();
    }
    @GetMapping("/allAdvertisement")
    public List<Ad> getAllAdvertisement() {
        return adService.getAllAdvertisement();
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> create(
            @RequestParam("title") String title,
            @RequestParam("image") MultipartFile image,
            @RequestParam(value = "expirationDate", required = false) String expirationDateStr,
            @RequestParam("category") String category,
            @RequestParam(value = "publicationStatus", required = false) Boolean publicationStatus,
            @RequestParam("isActive") Boolean isActive,
            @RequestParam("idUser") int idUser
    ) {
        try {
            LocalDate expirationDate = null;
            if (expirationDateStr != null && !expirationDateStr.trim().isEmpty()) {
                expirationDate = LocalDate.parse(expirationDateStr);
            }

            Boolean statusToSave = (publicationStatus != null) ? publicationStatus : true;

            adService.add(title, image, expirationDate, category, statusToSave, isActive, idUser);

            return ResponseEntity.ok("Anuncio guardado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al guardar: " + e.getMessage());
        }
    }

    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> update(
            @PathVariable("id") int id,
            @RequestParam("title") String title,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "expirationDate", required = false) String expirationDateStr,
            @RequestParam("category") String category,
            @RequestParam("publicationStatus") Boolean publicationStatus,
            @RequestParam("isActive") Boolean isActive,
            @RequestParam("idUser") int idUser
    ) {
        try {
            LocalDate expirationDate = null;
            if (expirationDateStr != null && !expirationDateStr.trim().isEmpty()) {
                expirationDate = LocalDate.parse(expirationDateStr);
            }

            adService.update(id, title, image, expirationDate, category, publicationStatus, isActive, idUser);

            return ResponseEntity.ok("Anuncio actualizado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al actualizar: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(@RequestParam int id) {
        try {
            adService.deleteById(id);
            return ResponseEntity.ok("Anuncio eliminado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Error al eliminar: " + e.getMessage());
        }
    }
}
