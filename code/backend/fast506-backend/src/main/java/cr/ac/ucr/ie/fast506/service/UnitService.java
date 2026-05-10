/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.dao_implement.UnitDAOImplement;
import cr.ac.ucr.ie.fast506.domain.Unit;
import java.util.Calendar;
import java.util.LinkedList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UnitService {

    @Autowired
    private UnitDAOImplement unitDAO;

    public LinkedList<Unit> getAll() {
        return unitDAO.getAll();
    }

    public void add(Unit unit) {
        if (existsByVIN(unit.getVIN())) {
            throw new IllegalArgumentException("El VIN ya está registrado.");
        }
        validate(unit);
        unitDAO.add(unit);
    }

    public void deleteById(int id) {
        unitDAO.deleteById(id);
    }

    public void update(Unit unit) {
        validate(unit);
        unitDAO.update(unit);
    }

    public boolean existsByVIN(String vin) {
        return unitDAO.existsByVIN(vin);
    }

    private void validate(Unit unit) {

        if (unit.getVIN() == null || !unit.getVIN().matches("^[A-HJ-NPR-Za-hj-npr-z0-9]{17}$")) {
            throw new IllegalArgumentException("VIN inválido: debe tener 17 caracteres alfanuméricos sin las letras I, O o Q.");
        }

        if (unit.getEngineNumber() == null || unit.getEngineNumber().trim().isEmpty() || unit.getEngineNumber().length() > 17) {
            throw new IllegalArgumentException("Número de motor inválido: debe llenar el espacio y máximo 17 caracteres.");
        }

        if (unit.getCarBrand() == null || !unit.getCarBrand().matches("^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\\s]{1,100}$")) {
            throw new IllegalArgumentException("Marca inválida: solo letras y espacios, máximo 100 caracteres.");
        }

        if (unit.getCarName() == null || !unit.getCarName().matches("^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\\s]{1,100}$")) {
            throw new IllegalArgumentException("Nombre inválido: solo letras y espacios, máximo 100 caracteres.");
        }

        if (unit.getLegalBrandName() == null || unit.getLegalBrandName().trim().isEmpty() || unit.getLegalBrandName().length() > 100) {
            throw new IllegalArgumentException("Nombre legal inválido: no puede estar vacío, máximo 100 caracteres.");
        }

        if (unit.getYearManufacture() <= 0) {
            throw new IllegalArgumentException("El año de manufactura es requerido.");
        }

        if (unit.getColor() == null || !unit.getColor().matches("^[a-záéíóúüñA-ZÁÉÍÓÚÜÑ\\s]{1,50}$")) {//Esto hace que no lleve tildes ni caracteres
            throw new IllegalArgumentException("Color inválido: solo letras y espacios, máximo 50 caracteres.");
        }

        if (unit.getBodyWork() == null || unit.getBodyWork().trim().isEmpty() || unit.getBodyWork().length() > 100) {
            throw new IllegalArgumentException("Carrocería inválida: no puede estar vacía, máximo 100 caracteres.");
        }

        if (unit.getEngineSize() == null || unit.getEngineSize().trim().isEmpty() || unit.getEngineSize().length() > 20) {
            throw new IllegalArgumentException("Cilindraje inválido: no puede estar vacío, máximo 20 caracteres.");
        }

        if (unit.getTransmission() == null || unit.getTransmission().trim().isEmpty()) {
            throw new IllegalArgumentException("Debe seleccionar una transmisión.");
        }

        if (unit.getTraction() == null || unit.getTraction().trim().isEmpty()) {
            throw new IllegalArgumentException("Debe seleccionar una tracción.");
        }

        if (unit.getFuelType() == null || unit.getFuelType().trim().isEmpty()) {
            throw new IllegalArgumentException("Debe seleccionar un tipo de combustible.");
        }

        if (unit.getIdSupplier() <= 0) {
            throw new IllegalArgumentException("Debe seleccionar un proveedor.");
        }
    }
}
