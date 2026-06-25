package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.dao_implement.MechanicDAOImplement;
import cr.ac.ucr.ie.fast506.domain.Mechanic;
import cr.ac.ucr.ie.fast506.domain.Role;
import cr.ac.ucr.ie.fast506.repository.MechanicRepository;
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
public class MechanicService {

    @Autowired
    private MechanicRepository mechanicRepository;

    @Autowired
    private UserRepository userRepository;

    private final String uploadDir = "uploads/";

    public List<Mechanic> getAll() {
        return mechanicRepository.getAllMechanics();
    }

    public void add(String name, int id, String email, String password, String phoneNumber,
                    String dateBirth, boolean isActive, Integer idRole, String employeeId,
                    String corporateEmail, String specialty, String certLevel,
                    MultipartFile profileImage) throws IOException {
        if (userRepository.findByIdEquals(id).isPresent()) {
            throw new IllegalArgumentException("La cédula ya está registrada. Use una cédula diferente.");
        }
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("El correo electrónico ya está registrado. Use un correo diferente.");
        }
        Mechanic mechanic = buildMechanic(0, name, id, email, password, phoneNumber, dateBirth, isActive, idRole, employeeId, corporateEmail, specialty, certLevel);
        mechanic.setIsActive(true);
        validate(mechanic);
        if (profileImage != null && !profileImage.isEmpty()) {
            mechanic.setProfileImage(saveImage(profileImage));
        }
        mechanicRepository.save(mechanic);
    }

    public void deleteById(int id) {
        mechanicRepository.deleteMechanicById(id);
    }

    public void update(int idUser, String name, int id, String email, String password, String phoneNumber,
                       String dateBirth, boolean isActive, Integer idRole, String employeeId,
                       String corporateEmail, String specialty, String certLevel,
                       MultipartFile profileImage) throws IOException {
        Mechanic mechanic = buildMechanic(idUser, name, id, email, password, phoneNumber, dateBirth, isActive, idRole, employeeId, corporateEmail, specialty, certLevel);
        validate(mechanic);
        if (profileImage != null && !profileImage.isEmpty()) {
            Mechanic existing = mechanicRepository.findById(idUser).orElse(null);
            if (existing != null && existing.getProfileImage() != null) {
                Files.deleteIfExists(Paths.get(existing.getProfileImage()));
            }
            mechanic.setProfileImage(saveImage(profileImage));
        } else {
            Mechanic existing = mechanicRepository.findById(idUser).orElse(null);
            if (existing != null) {
                mechanic.setProfileImage(existing.getProfileImage());
            }
        }
        mechanicRepository.save(mechanic);
    }

    private Mechanic buildMechanic(int idUser, String name, int id, String email, String password,
                                    String phoneNumber, String dateBirth, boolean isActive,
                                    Integer idRole, String employeeId, String corporateEmail,
                                    String specialty, String certLevel) {
        Mechanic mechanic = new Mechanic();
        if (idUser != 0) mechanic.setIdUser(idUser);
        mechanic.setName(name);
        mechanic.setId(id);
        mechanic.setEmail(email);
        mechanic.setPassword(password);
        mechanic.setPhoneNumber(phoneNumber);
        mechanic.setDateBirth(LocalDate.parse(dateBirth));
        mechanic.setIsActive(isActive);
        mechanic.setEmployeeId(employeeId);
        mechanic.setCorporateEmail(corporateEmail);
        mechanic.setSpecialty(specialty);
        mechanic.setCertLevel(certLevel);
        if (idRole != null) {
            Role role = new Role();
            role.setIdRole(idRole);
            mechanic.setRole(role);
        }
        return mechanic;
    }

    private String saveImage(MultipartFile image) throws IOException {
        String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
        Path path = Paths.get(uploadDir + fileName);
        Files.createDirectories(path.getParent());
        Files.write(path, image.getBytes());
        return "uploads/" + fileName;
    }

    private void validate(Mechanic mechanic) {

        if (mechanic.getName() == null
                || !mechanic.getName().matches("^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\\s]{1,50}$")) {

            throw new IllegalArgumentException(
                    "Nombre inválido: solo letras y espacios, máximo 50 caracteres.");
        }

        if (String.valueOf(mechanic.getId()).length() != 9) {
            throw new IllegalArgumentException(
                    "Cédula inválida: debe tener exactamente 9 dígitos numéricos.");
        }

        if (mechanic.getEmail() == null
                || !mechanic.getEmail().matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")) {

            throw new IllegalArgumentException(
                    "Correo electrónico inválido: debe tener un formato válido.");
        }

        if (mechanic.getPassword() == null
                || mechanic.getPassword().length() < 8
                || !mechanic.getPassword().matches(".*[A-Z].*")
                || !mechanic.getPassword().matches(".*[a-z].*")
                || !mechanic.getPassword().matches(".*\\d.*")
                || !mechanic.getPassword().matches(".*[@$!%*?&].*")) {

            throw new IllegalArgumentException(
                    "Contraseña inválida: debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.");
        }

        if (mechanic.getPhoneNumber() == null
                || !mechanic.getPhoneNumber().matches("^[0-9]{8}$")) {

            throw new IllegalArgumentException(
                    "Número de teléfono inválido: debe tener exactamente 8 dígitos numéricos.");

        }

        if (mechanic.getDateBirth() == null || mechanic.getDateBirth().isAfter(java.time.LocalDate.now())) {

            throw new IllegalArgumentException("Fecha de nacimiento inválida: no puede ser una fecha futura.");

        }

        if (mechanic.getEmployeeId() == null || !mechanic.getEmployeeId().matches("^[a-zA-Z0-9]{1,20}$")) {

            throw new IllegalArgumentException("ID de empleado inválido: debe tener unicamente letras y números, máximo 20 caracteres.");

        }

        if (mechanic.getCorporateEmail() == null || !mechanic.getCorporateEmail().matches("^[A-Za-z0-9._%+-]+@agenciafast\\.cr$")) {

            throw new IllegalArgumentException("Correo corporativo inválido: debe terminar en @agenciafast.cr y tener un formato válido.");

        }

        if (mechanic.getSpecialty() == null || !mechanic.getSpecialty().matches("Motor|Transmisión|Frenos|Suspensión|Electricidad|")) {

            throw new IllegalArgumentException("Seleccione una especialidad valida");

        }

        if (mechanic.getCertLevel() == null || !mechanic.getCertLevel().matches("Básico|Intermedio|Avanzado|Experto")) {

            throw new IllegalArgumentException("Seleccione un nivel de certificación válido");

        }

    }

}
