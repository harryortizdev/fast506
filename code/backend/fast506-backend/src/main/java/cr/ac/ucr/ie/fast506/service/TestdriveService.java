/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.domain.Testdrive;
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

    public List<Testdrive> getAll() {
        return testdriveRepository.getAll();
    }

    public void update(Testdrive testdrive) {
        testdriveRepository.save(testdrive);
    }

    public void deleteById(int id) {
        testdriveRepository.deleteTestdriveByIdPA(id);

    }

    public void add(Testdrive testdrive) {
        testdrive.setIsActive(true);
        testdriveRepository.save(testdrive);
    }

    public List<String> getOccupiedHoursByDate(LocalDate date) {
        return testdriveRepository.findOccupiedHoursByDate(date);
    }

}
