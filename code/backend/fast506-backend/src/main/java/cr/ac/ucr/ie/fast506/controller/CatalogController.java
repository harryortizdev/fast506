/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/springframework/RestController.java to edit this template
 */
package cr.ac.ucr.ie.fast506.controller;

import cr.ac.ucr.ie.fast506.domain.Catalog;
import cr.ac.ucr.ie.fast506.domain.CategoriesCatalog;
import cr.ac.ucr.ie.fast506.domain.ColorUnit;
import cr.ac.ucr.ie.fast506.domain.UnitGroup;
import cr.ac.ucr.ie.fast506.service.CatalogService;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/catalogs")
public class CatalogController {

    @Autowired
    private CatalogService catalogService;

    @GetMapping("/all")
    public List<Catalog> getAll() {
        return catalogService.getAll();
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> create(
            @RequestParam("brandName") String brandName,
            @RequestParam("carName") String carName,
            @RequestParam("yearManufacture") Integer yearManufacture,
            @RequestParam("bodyWork") String bodyWork,
            @RequestParam("transmission") String transmission,
            @RequestParam("fuelType") String fuelType,
            @RequestParam("engineSize") String engineSize,
            @RequestParam("basePrice") Double basePrice,
            @RequestParam("technicalDescription") String technicalDescription,
            @RequestParam("isActive") Boolean isActive,
            @RequestParam("image") MultipartFile image
    ) {
        try {
            catalogService.add(
                    brandName,
                    carName,
                    yearManufacture,
                    bodyWork,
                    transmission,
                    fuelType,
                    engineSize,
                    basePrice,
                    technicalDescription,
                    isActive,
                    image
            );
            return ResponseEntity.ok("Catálogo guardado correctamente");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
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

    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> update(
            @PathVariable Integer id,
            @RequestParam("brandName") String brandName,
            @RequestParam("carName") String carName,
            @RequestParam("yearManufacture") Integer yearManufacture,
            @RequestParam("bodyWork") String bodyWork,
            @RequestParam("transmission") String transmission,
            @RequestParam("fuelType") String fuelType,
            @RequestParam("engineSize") String engineSize,
            @RequestParam("basePrice") Double basePrice,
            @RequestParam("technicalDescription") String technicalDescription,
            @RequestParam("isActive") Boolean isActive,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        try {

            catalogService.update(
                    id,
                    brandName,
                    carName,
                    yearManufacture,
                    bodyWork,
                    transmission,
                    fuelType,
                    engineSize,
                    basePrice,
                    technicalDescription,
                    isActive,
                    image
            );

            return ResponseEntity.ok("Catálogo actualizado correctamente");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/available")
    public List<UnitGroup> getAvaible() {
        return catalogService.getUnitsNotInCatalog();
    }
    
     @GetMapping("/categories")
    public List<CategoriesCatalog> getCategories() {
        return catalogService.getCategories();
    }
    
     @GetMapping("/by-bodywork")
    public List<Catalog> getCatalogByBodyWork(@RequestParam String bodywork) {
        return catalogService.getCatalogByBodyWork(bodywork);
    }
    
    @GetMapping("/findById/{id}")
    public Catalog findById(@PathVariable Integer id) {
        return catalogService.findById(id);
    }
    
    @GetMapping("/color/{id}")
    public List<ColorUnit> getColorByCatalog(@PathVariable Integer id) {
        return catalogService.getColorByCatalog(id);
    }
}
