package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.dao_implement.AdministratorDAOImplement;
import cr.ac.ucr.ie.fast506.domain.Administrator;
import cr.ac.ucr.ie.fast506.domain.Role;
import cr.ac.ucr.ie.fast506.repository.AdministratorRespository;
import cr.ac.ucr.ie.fast506.repository.UserRepository;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AdministratorService {

    @Autowired
    private AdministratorDAOImplement adminDAO;

    @Autowired
    private AdministratorRespository adminRepository;

    @Autowired
    private UserRepository userRepository;

    private final String uploadDir = "uploads/";

    public List<Administrator> getAll() {
        return adminRepository.getAll();
    }

    public void add(String name, int id, String email, String password, String phoneNumber,
                    String dateBirth, boolean isActive, Integer idRole, String employeeId,
                    String corporateEmail, MultipartFile profileImage) throws IOException {
        if (userRepository.findByIdEquals(id).isPresent()) {
            throw new IllegalArgumentException("La cédula ya está registrada. Use una cédula diferente.");
        }
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("El correo electrónico ya está registrado. Use un correo diferente.");
        }

        Administrator admin = buildAdministrator(0, name, id, email, password, phoneNumber,
                dateBirth, isActive, idRole, employeeId, corporateEmail);

        validate(admin);

        if (profileImage != null && !profileImage.isEmpty()) {
            admin.setProfileImage(saveImage(profileImage));
        }

        adminRepository.save(admin);
    }

    public void deleteById(int id) {
        adminRepository.deleteAdministrator(id);
    }

    public void update(int idUser, String name, int id, String email, String password, String phoneNumber,
                       String dateBirth, boolean isActive, Integer idRole, String employeeId,
                       String corporateEmail, MultipartFile profileImage) throws IOException {

        Administrator admin = buildAdministrator(idUser, name, id, email, password, phoneNumber,
                dateBirth, isActive, idRole, employeeId, corporateEmail);

        validate(admin);

        if (profileImage != null && !profileImage.isEmpty()) {
            Administrator existing = adminRepository.findById(idUser).orElse(null);
            if (existing != null && existing.getProfileImage() != null) {
                Files.deleteIfExists(Paths.get(existing.getProfileImage()));
            }
            admin.setProfileImage(saveImage(profileImage));
        } else {
            Administrator existing = adminRepository.findById(idUser).orElse(null);
            if (existing != null) {
                admin.setProfileImage(existing.getProfileImage());
            }
        }

        adminRepository.save(admin);
    }

    private Administrator buildAdministrator(int idUser, String name, int id, String email,
                                              String password, String phoneNumber, String dateBirth,
                                              boolean isActive, Integer idRole, String employeeId,
                                              String corporateEmail) {
        Administrator admin = new Administrator();
        if (idUser != 0) admin.setIdUser(idUser);
        admin.setName(name);
        admin.setId(id);
        admin.setEmail(email);
        admin.setPassword(password);
        admin.setPhoneNumber(phoneNumber);
        admin.setDateBirth(LocalDate.parse(dateBirth));
        admin.setIsActive(isActive);
        admin.setEmployeeId(employeeId);
        if (corporateEmail != null && !corporateEmail.isBlank()) {
            admin.setCorporateEmail(corporateEmail);
        }
        if (idRole != null) {
            Role role = new Role();
            role.setIdRole(idRole);
            admin.setRole(role);
        }
        return admin;
    }

    private String saveImage(MultipartFile image) throws IOException {
        String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
        Path path = Paths.get(uploadDir + fileName);
        Files.createDirectories(path.getParent());
        Files.write(path, image.getBytes());
        return "uploads/" + fileName;
    }



    public Administrator findByEmailAndPassword(String email, String password) {
        return adminRepository.findByEmailAndPassword(email, password);
    }

    private void validate(Administrator admin) {

        if (admin.getName() == null
                || !admin.getName().matches("^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\\s]{1,50}$")) {

            throw new IllegalArgumentException(
                    "Nombre inválido: solo letras y espacios, máximo 50 caracteres.");
        }

        if (String.valueOf(admin.getId()).length() != 9) {
            throw new IllegalArgumentException(
                    "Cédula inválida: debe tener exactamente 9 dígitos numéricos.");
        }

        if (admin.getEmail() == null
                || !admin.getEmail().matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")) {

            throw new IllegalArgumentException(
                    "Correo electrónico inválido: debe tener un formato válido.");
        }

        if (admin.getPassword() == null
                || admin.getPassword().length() < 8
                || !admin.getPassword().matches(".*[A-Z].*")
                || !admin.getPassword().matches(".*[a-z].*")
                || !admin.getPassword().matches(".*\\d.*")
                || !admin.getPassword().matches(".*[@$!%*?&].*")) {

            throw new IllegalArgumentException(
                    "Contraseña inválida: debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.");
        }

        if (admin.getPhoneNumber() == null
                || !admin.getPhoneNumber().matches("^[0-9]{8}$")) {

            throw new IllegalArgumentException(
                    "Número de teléfono inválido: debe tener exactamente 8 dígitos numéricos.");

        }

        if (admin.getDateBirth() == null || admin.getDateBirth().isAfter(java.time.LocalDate.now())) {

            throw new IllegalArgumentException("Fecha de nacimiento inválida: no puede ser una fecha futura.");

        }

        if (admin.getEmployeeId() == null || !admin.getEmployeeId().matches("^[a-zA-Z0-9]{1,20}$")) {

            throw new IllegalArgumentException("ID de empleado inválido: debe tener unicamente letras y números, máximo 20 caracteres.");

        }

        if (admin.getCorporateEmail() == null || !admin.getCorporateEmail().matches("^[A-Za-z0-9._%+-]+@agenciafast\\.cr$")) {

            throw new IllegalArgumentException("Correo corporativo inválido: debe terminar en @agenciafast.cr y tener un formato válido.");

        }

    }

}
