package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.dao_implement.ClientDAOImplement;
import cr.ac.ucr.ie.fast506.domain.Client;
import cr.ac.ucr.ie.fast506.domain.Role;
import cr.ac.ucr.ie.fast506.repository.ClientRepository;
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
public class ClientService {

    @Autowired
    private ClientDAOImplement clientDAO;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private UserRepository userRepository;

    private final String uploadDir = "uploads/";

    public List<Client> getAll() {
        return clientRepository.getAllClients();
    }

    public void add(String name, int id, String email, String password, String phoneNumber,
                    String dateBirth, boolean isActive, Integer idRole, String commInterest,
                    String physicalAddress, String occupation, MultipartFile profileImage) throws IOException {
        if (userRepository.findByIdEquals(id).isPresent()) {
            throw new IllegalArgumentException("La cédula ya está registrada. Use una cédula diferente.");
        }
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("El correo electrónico ya está registrado. Use un correo diferente.");
        }
        Client client = buildClient(0, name, id, email, password, phoneNumber, dateBirth, isActive, idRole, commInterest, physicalAddress, occupation);
        validate(client);
        if (profileImage != null && !profileImage.isEmpty()) {
            client.setProfileImage(saveImage(profileImage));
        }
        clientRepository.save(client);
    }

    public void deleteById(int id) {
        clientRepository.deleteClientById(id);
    }

    public void update(int idUser, String name, int id, String email, String password, String phoneNumber,
                       String dateBirth, boolean isActive, Integer idRole, String commInterest,
                       String physicalAddress, String occupation, MultipartFile profileImage) throws IOException {
        Client client = buildClient(idUser, name, id, email, password, phoneNumber, dateBirth, isActive, idRole, commInterest, physicalAddress, occupation);
        validate(client);
        if (profileImage != null && !profileImage.isEmpty()) {
            Client existing = clientRepository.findById(idUser).orElse(null);
            if (existing != null && existing.getProfileImage() != null) {
                Files.deleteIfExists(Paths.get(existing.getProfileImage()));
            }
            client.setProfileImage(saveImage(profileImage));
        } else {
            Client existing = clientRepository.findById(idUser).orElse(null);
            if (existing != null) {
                client.setProfileImage(existing.getProfileImage());
            }
        }
        clientRepository.save(client);
    }

    public Client findByEmailAndPassword(String email, String password) {
        return clientRepository.findByEmailAndPassword(email, password);
    }

    private Client buildClient(int idUser, String name, int id, String email, String password,
                                String phoneNumber, String dateBirth, boolean isActive, Integer idRole,
                                String commInterest, String physicalAddress, String occupation) {
        Client client = new Client();
        if (idUser != 0) client.setIdUser(idUser);
        client.setName(name);
        client.setId(id);
        client.setEmail(email);
        client.setPassword(password);
        client.setPhoneNumber(phoneNumber);
        client.setDateBirth(LocalDate.parse(dateBirth));
        client.setIsActive(isActive);
        client.setCommInterest(commInterest);
        client.setPhysicalAddress(physicalAddress);
        client.setOccupation(occupation);
        if (idRole != null) {
            Role role = new Role();
            role.setIdRole(idRole);
            client.setRole(role);
        }
        return client;
    }

    private String saveImage(MultipartFile image) throws IOException {
        String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
        Path path = Paths.get(uploadDir + fileName);
        Files.createDirectories(path.getParent());
        Files.write(path, image.getBytes());
        return "uploads/" + fileName;
    }

    private void validate(Client client) {

        if (client.getName() == null
                || !client.getName().matches("^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\\s]{1,50}$")) {

            throw new IllegalArgumentException(
                    "Nombre inválido: solo letras y espacios, máximo 50 caracteres.");
        }

        if (String.valueOf(client.getId()).length() != 9) {
            throw new IllegalArgumentException(
                    "Cédula inválida: debe tener exactamente 9 dígitos numéricos.");
        }

        if (client.getEmail() == null
                || !client.getEmail().matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$")) {

            throw new IllegalArgumentException(
                    "Correo electrónico inválido: debe tener un formato válido.");
        }

        if (client.getPassword() == null
                || client.getPassword().length() < 8
                || !client.getPassword().matches(".*[A-Z].*")
                || !client.getPassword().matches(".*[a-z].*")
                || !client.getPassword().matches(".*\\d.*")
                || !client.getPassword().matches(".*[@$!%*?&].*")) {

            throw new IllegalArgumentException(
                    "Contraseña inválida: debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.");
        }

        if (client.getPhoneNumber() == null
                || !client.getPhoneNumber().matches("^[0-9]{8}$")) {

            throw new IllegalArgumentException(
                    "Número de teléfono inválido: debe tener exactamente 8 dígitos numéricos.");

        }

        if (client.getDateBirth() == null || client.getDateBirth().isAfter(java.time.LocalDate.now())) {

            throw new IllegalArgumentException("Fecha de nacimiento inválida: no puede ser una fecha futura.");

        }

        if (client.getCommInterest() == null || !client.getCommInterest().matches("Sedán|SUV|Camioneta|Deportivo|Híbrido|Eléctrico|Convertible|Todoterreno")) {

            throw new IllegalArgumentException("Seleccione un interés valido");

        }

    }

}
