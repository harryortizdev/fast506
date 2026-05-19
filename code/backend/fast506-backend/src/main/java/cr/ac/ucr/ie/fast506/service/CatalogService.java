/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.domain.Catalog;
import cr.ac.ucr.ie.fast506.domain.UnitGroup;
import cr.ac.ucr.ie.fast506.repository.CatalogRepository;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CatalogService {

    @Autowired
    private CatalogRepository catalogRepository;

    public List<Catalog> getAll() {
        return catalogRepository.getAll();
    }

    public void deleteById(int id) {
        catalogRepository.deleteCatalog(id);
    }

    public List<UnitGroup> getUnitsNotInCatalog() {
        return catalogRepository.getUnitsNotInCatalog();
    }

    public void add(String brandName, String carName, Integer yearManufacture, String bodyWork, String transmission, String fuelType, String engineSize, Double basePrice, String technicalDescription, Boolean active, MultipartFile image) {
        try {
            String uploadDir = "uploads/";
            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();//se asigna un nombre unico
            Path path = Paths.get(uploadDir + fileName);//es la ruta fisica
            Files.createDirectories(path.getParent());//crea la carpeta si o existe
            Files.write(path, image.getBytes());//guarda el archivo

            Catalog catalog = new Catalog();

            catalog.setBrandName(brandName);
            catalog.setCarName(carName);
            catalog.setYearManufacture(yearManufacture);
            catalog.setBodyWork(bodyWork);
            catalog.setTransmission(transmission);
            catalog.setFuelType(fuelType);
            catalog.setEngineSize(engineSize);
            catalog.setBasePrice(basePrice);
            catalog.setTechnicalDescription(technicalDescription);
            catalog.setIsActive(active);

            catalog.setImage("uploads/" + fileName);
            
            validateCatalog(catalog);
            catalogRepository.save(catalog);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Optional<Catalog> findById(int id) {
        return catalogRepository.findById(id);
    }

    public void update(int id, String brandName, String carName, Integer yearManufacture, String bodyWork, String transmission, String fuelType, String engineSize, Double basePrice, String technicalDescription, Boolean active, MultipartFile image) {
        try {

            Catalog catalog = findById(id)
                    .orElseThrow(() -> new RuntimeException("Catálogo no encontrado"));

            catalog.setBrandName(brandName);
            catalog.setCarName(carName);
            catalog.setYearManufacture(yearManufacture);
            catalog.setBodyWork(bodyWork);
            catalog.setTransmission(transmission);
            catalog.setFuelType(fuelType);
            catalog.setEngineSize(engineSize);
            catalog.setBasePrice(basePrice);
            catalog.setTechnicalDescription(technicalDescription);
            catalog.setIsActive(active);

            if (image != null && !image.isEmpty()) {

                String uploadDir = "uploads/";
                String fileName = UUID.randomUUID() + "_"
                        + image.getOriginalFilename();

                Path path = Paths.get(uploadDir + fileName);
                Files.createDirectories(path.getParent());
                Files.write(path, image.getBytes());
                catalog.setImage("uploads/" + fileName);
            }
            validateCatalog(catalog);
            catalogRepository.save(catalog);
        } catch (Exception e) {

            e.printStackTrace();

        }

    }
    
 private void validateCatalog(Catalog catalog) {

    if (catalog.getBrandName() == null || catalog.getBrandName().trim().isEmpty()) {
        throw new RuntimeException("Marca requerida.");
    }

    if (catalog.getCarName() == null || catalog.getCarName().trim().isEmpty()) {
        throw new RuntimeException("Modelo requerido.");
    }

    if (catalog.getYearManufacture() == 0) {
        throw new RuntimeException("Año requerido.");
    }

    if (catalog.getBodyWork() == null || catalog.getBodyWork().trim().isEmpty()) {
        throw new RuntimeException("Carrocería requerida.");
    }

    if (catalog.getTransmission() == null || catalog.getTransmission().trim().isEmpty()) {
        throw new RuntimeException("Transmisión requerida.");
    }

    if (catalog.getFuelType() == null || catalog.getFuelType().trim().isEmpty()) {
        throw new RuntimeException("Combustible requerido.");
    }

    if (catalog.getEngineSize() == null || catalog.getEngineSize().trim().isEmpty()) {
        throw new RuntimeException("Motor requerido.");
    }

    if (catalog.getBasePrice() == 0 || catalog.getBasePrice() <= 0) {
        throw new RuntimeException("Precio inválido.");
    }

    if (catalog.getTechnicalDescription() == null 
            || catalog.getTechnicalDescription().trim().isEmpty()) {
        throw new RuntimeException("Descripción requerida.");
    }
}
}
