package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.domain.Ad;
import cr.ac.ucr.ie.fast506.repository.AdRepository;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AdService {

    @Autowired
    AdRepository adRepository;

    private final String uploadDir = "uploads/";

    public List<Ad> getAll() {
        return adRepository.getAll();
    }


    public void deleteById(int id) {
        adRepository.deleteAdByIdPA(id);
    }

    public void add(String title, MultipartFile image, LocalDate expirationDate, String category, Boolean publicationStatus, Boolean active, int idUser) throws IOException {
        try {
            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename(); // Nombre único
            Path path = Paths.get(uploadDir + fileName); // Ruta física
            Files.createDirectories(path.getParent()); // Crea la carpeta si no existe
            Files.write(path, image.getBytes()); // Guarda el archivo físico

            Ad ad = new Ad();
            ad.setTitle(title);
            ad.setImage("uploads/" + fileName);
            ad.setCategory(category);
            ad.setIdUser(idUser);
            ad.setExpirationDate(expirationDate);

            ad.setPublicationStatus(publicationStatus);
            ad.setIsActive(active);

            adRepository.save(ad);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error al guardar el anuncio físicamente: " + e.getMessage());
        }
    }

    public void update(int id, String title, MultipartFile image, LocalDate expirationDate, String category, Boolean publicationStatus, Boolean active, int idUser) {
    try {
        Ad ad = adRepository.findById(id).orElse(null);

        if (ad == null) {
            throw new IllegalArgumentException("El anuncio no existe.");
        }

        ad.setTitle(title);
        ad.setCategory(category);
        ad.setIdUser(idUser);
        ad.setExpirationDate(expirationDate);
        ad.setPublicationStatus(publicationStatus);
        ad.setIsActive(active);

        if (image != null && !image.isEmpty()) {
            if (ad.getImage() != null) {
                Path rutaImagenVieja = Paths.get(ad.getImage());
                Files.deleteIfExists(rutaImagenVieja);
            }

            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path path = Paths.get(uploadDir + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, image.getBytes());

            ad.setImage("uploads/" + fileName);
        }

        adRepository.save(ad);

    } catch (IllegalArgumentException e) {
        throw e; 
    } catch (Exception e) {
        e.printStackTrace();
        throw new RuntimeException("Error al actualizar el anuncio: " + e.getMessage());
    }
}
    
    
    @Scheduled(cron = "0 0 0 * * ?") // SEGUNDO 0, MINUTO 0, HORA 0 TODOS LOS DIAS * , TODOS LOS MESES * , DA IGUAL EL DIA DE LA SEMANA ?
    @Transactional
    public void deactivateAdByExpirationDate() {
        System.out.println("Cron Job: Buscando y desactivando anuncios vencidos...");
                adRepository.deactivateAdByExpirationDatePA(); 
    }

    public List<Ad> getAllBranch() {
        return adRepository.getAllBranchPA();
    }

    public List<Ad> getAllAdvertisement() {
        return adRepository.getAllAdvertisementPA();
    }
}

