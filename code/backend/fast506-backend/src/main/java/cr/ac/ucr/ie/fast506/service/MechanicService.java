package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.dao_implement.MechanicDAOImplement;
import cr.ac.ucr.ie.fast506.domain.Mechanic;
import cr.ac.ucr.ie.fast506.repository.MechanicRepository;
import java.util.LinkedList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MechanicService {

    @Autowired
    private MechanicRepository mechanicRepository;

    public List<Mechanic> getAll() {

        return mechanicRepository.getAllMechanics();

    }

    public void add(Mechanic mechanic) {

        validate(mechanic);
        mechanic.setIsActive(true);
        mechanicRepository.save(mechanic);

    }

    public void deleteById(int id) {

        mechanicRepository.deleteMechanicById(id);

    }

    public void update(Mechanic mechanic) {

        validate(mechanic);
        mechanicRepository.save(mechanic);

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

        if (mechanic.getProfileImage() == null) {

            throw new IllegalArgumentException("La foto de perfil es requerida.");

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
