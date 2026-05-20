/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.domain.Client;
import cr.ac.ucr.ie.fast506.domain.Testdrive;
import cr.ac.ucr.ie.fast506.repository.ClientRepository;
import cr.ac.ucr.ie.fast506.repository.TestdriveRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ediso
 */
@Service
public class TestdriveService {

    @Autowired
    TestdriveRepository testdriveRepository;
    @Autowired
    ClientRepository clientRepository;

    public List<Testdrive> getAll() {
        return testdriveRepository.getAll();
    }

    public void update(Testdrive testdrive) {
        int anio = testdrive.getScheduledDate().getYear();
        int mes = testdrive.getScheduledDate().getMonthValue();
        int dia = testdrive.getScheduledDate().getDayOfMonth();
        int hora = testdrive.getInitiationTime().getHour();
        int combination = (anio * 1000000) + (mes * 10000) + (dia * 100) + hora;

        testdrive.setNumberReference(combination);

        testdriveRepository.save(testdrive);
    }

    public void deleteById(int id) {
        testdriveRepository.deleteTestdriveByIdPA(id);

    }

    public void add(Testdrive testdrive) {
        int anio = testdrive.getScheduledDate().getYear();
        int mes = testdrive.getScheduledDate().getMonthValue();
        int dia = testdrive.getScheduledDate().getDayOfMonth();
        int hora = testdrive.getInitiationTime().getHour();
        int combination = (anio * 1000000) + (mes * 10000) + (dia * 100) + hora;

        testdrive.setNumberReference(combination);
        testdrive.setIsActive(true);

        testdriveRepository.save(testdrive);
    }

    public List<String> getOccupiedHoursByDate(LocalDate date) {
        return testdriveRepository.findOccupiedHoursByDate(date);
    }

    public Client findByIdentity(int id) {
return clientRepository.findByIdEquals(id).orElse(null);    }

}
