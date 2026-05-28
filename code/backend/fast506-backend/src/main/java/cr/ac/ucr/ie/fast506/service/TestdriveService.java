/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.domain.Client;
import cr.ac.ucr.ie.fast506.domain.Testdrive;
import cr.ac.ucr.ie.fast506.domain.Unit;
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

        int total = (int) testdriveRepository.count() + 1;
        int month = testdrive.getScheduledDate().getMonthValue();
        int day = testdrive.getScheduledDate().getDayOfMonth();

        int combination = (total * 10000) + (day * 100) + month;

        testdrive.setNumberReference(combination);

        testdriveRepository.save(testdrive);
    }

    public void deleteById(int id) {
        testdriveRepository.deleteTestdriveByIdPA(id);

    }

    public void add(Testdrive testdrive) {
        testdrive.setIsActive(true);

        int total = (int) testdriveRepository.count() + 1;
        int month = testdrive.getScheduledDate().getMonthValue();
        int day = testdrive.getScheduledDate().getDayOfMonth();

        int combination = (total * 10000) + (day * 100) + month;

        testdrive.setNumberReference(combination);
        testdriveRepository.save(testdrive);
    }

    public List<String> getOccupiedHoursByDate(LocalDate date, int idBranch) {
        return testdriveRepository.findOccupiedHoursByDate(date, idBranch);
    }

    public Client findByIdentity(int id) {
        return clientRepository.findByIdEquals(id).orElse(null);
    }

    public List<Unit> allCarAvailable() {
        return testdriveRepository.allCarAvailable();

    }

}
