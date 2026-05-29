package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.domain.WorkshopSchedule;
import cr.ac.ucr.ie.fast506.repository.WorkshopScheduleRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkshopScheduleService {

    @Autowired
    private WorkshopScheduleRepository workshopScheduleRepository;

    public List<WorkshopSchedule> getAll() {
        return workshopScheduleRepository.getAll();
    }

    public void add(WorkshopSchedule workshopSchedule) {
        validate(workshopSchedule);
        workshopSchedule.setIsActive(true);
        workshopScheduleRepository.save(workshopSchedule);
    }

    public void deleteById(int id) {
        workshopScheduleRepository.deleteWorkshopSchedule(id);
    }

    public void update(WorkshopSchedule workshopSchedule) {
        validate(workshopSchedule);
        workshopSchedule.setIsActive(true);
        workshopScheduleRepository.save(workshopSchedule);
    }

    public WorkshopSchedule findById(Integer id) {
        return workshopScheduleRepository.findWorkshopScheduleById(id);
    }

    public List<WorkshopSchedule> getAllForReports() {
        return workshopScheduleRepository.getAllForReports();
    }

    private void validate(WorkshopSchedule workshopSchedule) {

        if (workshopSchedule.getNumberReference() <= 0) {
            throw new IllegalArgumentException("El número de referencia es requerido.");
        }

        if (workshopSchedule.getLicensePlate() == null
                || workshopSchedule.getLicensePlate().trim().isEmpty()
                || workshopSchedule.getLicensePlate().length() > 20) {
            throw new IllegalArgumentException("Placa inválida: no puede estar vacía y máximo 20 caracteres.");
        }

        if (workshopSchedule.getEntryDate() == null) {
            throw new IllegalArgumentException("La fecha de ingreso es requerida.");
        }

        if (workshopSchedule.getReasonService() == null
                || workshopSchedule.getReasonService().trim().isEmpty()
                || workshopSchedule.getReasonService().length() > 500) {
            throw new IllegalArgumentException("Motivo del servicio inválido: no puede estar vacío y máximo 500 caracteres.");
        }

        if (workshopSchedule.getReceptionMileage() < 0) {
            throw new IllegalArgumentException("El kilometraje no puede ser negativo.");
        }

        if (workshopSchedule.getIdClient() <= 0) {
            throw new IllegalArgumentException("Debe seleccionar un cliente.");
        }

        if (workshopSchedule.getIdBranch() <= 0) {
            throw new IllegalArgumentException("Debe seleccionar una sucursal.");
        }
    }
}
