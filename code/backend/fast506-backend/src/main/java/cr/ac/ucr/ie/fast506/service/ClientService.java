package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.dao_implement.ClientDAOImplement;
import cr.ac.ucr.ie.fast506.domain.Client;
import cr.ac.ucr.ie.fast506.repository.ClientRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientService {

    @Autowired
    private ClientDAOImplement clientDAO;

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> getAll() {

        return clientRepository.getAllClients();

    }

    public void add(Client client) {

        validate(client);
        clientRepository.save(client);

    }

    public void deleteById(int id) {

        clientRepository.deleteClientById(id);

    }

    public void update(Client client) {

        validate(client);
        clientRepository.save(client);

    }

    public Client findByEmailAndPassword(String email, String password) {
        return clientRepository.findByEmailAndPassword(email, password);
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

        if (client.getProfileImage() == null) {

            throw new IllegalArgumentException("La foto de perfil es requerida.");

        }

        if (client.getCommInterest() == null || !client.getCommInterest().matches("Sedán|SUV|Camioneta|Deportivo|Híbrido|Eléctrico|Convertible|Todoterreno")) {

            throw new IllegalArgumentException("Seleccione un interés valido");

        }

    }

}
