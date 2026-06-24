package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.dao_implement.AdministratorDAOImplement;
import cr.ac.ucr.ie.fast506.domain.Administrator;
import cr.ac.ucr.ie.fast506.repository.AdministratorRespository;
import java.util.LinkedList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdministratorService {

    @Autowired
    private AdministratorDAOImplement adminDAO;

    @Autowired
    private AdministratorRespository adminRepository;

    public List<Administrator> getAll() {

        return adminRepository.getAll();

    }

    public void add(Administrator admin) {

        if (existsByEmail(admin.getEmail())) {
            throw new IllegalArgumentException("El correo electrónico ya está registrado.");
        }
        validate(admin);
        admin.setIsActive(true);
        adminRepository.save(admin);

    }

    public void deleteById(int id) {

        adminRepository.deleteAdministrator(id);

    }

    public void update(Administrator admin) {

        validate(admin);
        admin.setIsActive(true);
        adminRepository.save(admin);

    }

    public Administrator findByEmailAndPassword(String email, String password) {
        return adminRepository.findByEmailAndPassword(email, password);
    }

    public boolean existsByEmail(String email) {
        return adminRepository.findByEmailAndPassword(email, "") != null;
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
