package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.domain.RepairReport;
import cr.ac.ucr.ie.fast506.repository.RepairReportRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RepairReportService {

    @Autowired
    private RepairReportRepository repairReportRepository;

    public List<RepairReport> getAll() {
        return repairReportRepository.getAll();
    }

    public void add(RepairReport repairReport) {
        validate(repairReport);
        repairReport.setIsActive(true);
        repairReportRepository.save(repairReport);
    }

    public void deleteById(int id) {
        repairReportRepository.deleteRepairReport(id);
    }

    public void update(RepairReport repairReport) {
        validate(repairReport);
        repairReportRepository.save(repairReport);
    }

    public RepairReport findById(Integer id) {
        return repairReportRepository.findRepairReportById(id);
    }

    private void validate(RepairReport repairReport) {

        if (repairReport.getNumberReference() <= 0) {
            throw new IllegalArgumentException("El número de referencia es requerido.");
        }

        if (repairReport.getTechnicalDiagnosis() != null
                && repairReport.getTechnicalDiagnosis().length() > 500) {
            throw new IllegalArgumentException("El diagnóstico técnico no puede superar los 500 caracteres.");
        }

        if (repairReport.getSpareParts() != null
                && repairReport.getSpareParts().length() > 500) {
            throw new IllegalArgumentException("Los repuestos no pueden superar los 500 caracteres.");
        }

        if (repairReport.getObservations() != null
                && repairReport.getObservations().length() > 500) {
            throw new IllegalArgumentException("Las observaciones no pueden superar los 500 caracteres.");
        }

        if (repairReport.getCost() < 0) {
            throw new IllegalArgumentException("El costo no puede ser negativo.");
        }

        if (repairReport.getTaxes() < 0) {
            throw new IllegalArgumentException("Los impuestos no pueden ser negativos.");
        }

        if (repairReport.getTotalPayment() < 0) {
            throw new IllegalArgumentException("El pago total no puede ser negativo.");
        }

        if (repairReport.getCompletionDate() == null) {
            throw new IllegalArgumentException("La fecha de finalización es requerida.");
        }

        if (repairReport.getIdMechanic() <= 0) {
            throw new IllegalArgumentException("Debe seleccionar un mecánico.");
        }
    }
}