package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.domain.Supplier;
import cr.ac.ucr.ie.fast506.repository.SupplierRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    public List<Supplier> getAll() {
        return supplierRepository.getAll();
    }

    public void add(Supplier supplier) {

        validate(supplier);

        supplier.setActive(true);

        supplierRepository.save(supplier);
    }

    public void deleteById(int id) {
        supplierRepository.deleteSupplier(id);
    }

    public void update(Supplier supplier) {

        validate(supplier);
        supplier.setActive(true);
        supplierRepository.save(supplier);
    }

    public Supplier findById(Integer id) {
        return supplierRepository.findSupplierById(id);
    }

    private void validate(Supplier supplier) {

        if (supplier.getName() == null
                || !supplier.getName().matches("^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\\s]{1,100}$")) {

            throw new IllegalArgumentException(
                    "Nombre inválido: solo letras y espacios, máximo 100 caracteres.");
        }

        if (supplier.getCompanyName() == null
                || supplier.getCompanyName().trim().isEmpty()
                || supplier.getCompanyName().length() > 100) {

            throw new IllegalArgumentException(
                    "Nombre de compañía inválido: no puede estar vacío y máximo 100 caracteres.");
        }

        if (supplier.getLegalName() == null
                || supplier.getLegalName().trim().isEmpty()
                || supplier.getLegalName().length() > 100) {

            throw new IllegalArgumentException(
                    "Nombre legal inválido: no puede estar vacío y máximo 100 caracteres.");
        }

        if (supplier.getSupportPhone() == null
                || !supplier.getSupportPhone().matches("^[0-9]{8,15}$")) {

            throw new IllegalArgumentException(
                    "Teléfono inválido: solo números entre 8 y 15 dígitos.");
        }

        if (supplier.getBussinesContactName() == null
                || !supplier.getBussinesContactName()
                        .matches("^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\\s]{1,100}$")) {

            throw new IllegalArgumentException(
                    "Nombre de contacto inválido: solo letras y espacios, máximo 100 caracteres.");
        }

        if (supplier.getEmail() == null
                || !supplier.getEmail()
                        .matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {

            throw new IllegalArgumentException(
                    "Correo electrónico inválido.");
        }

        if (supplier.getUbicacion() == null
                || supplier.getUbicacion().trim().isEmpty()
                || supplier.getUbicacion().length() > 200) {

            throw new IllegalArgumentException(
                    "Ubicación inválida: no puede estar vacía y máximo 200 caracteres.");
        }

        if (supplier.getAdminId() <= 0) {

            throw new IllegalArgumentException(
                    "Debe seleccionar un administrador.");
        }
    }
}