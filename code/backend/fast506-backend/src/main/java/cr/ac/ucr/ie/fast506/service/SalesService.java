/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.domain.Sales;
import cr.ac.ucr.ie.fast506.domain.Unit;
import cr.ac.ucr.ie.fast506.repository.SalesRepository;
import cr.ac.ucr.ie.fast506.repository.UnitRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Harry Ortiz
 */
@Service
public class SalesService {

    @Autowired
    private SalesRepository salesRepository;

    @Autowired
    private UnitRepository unitRepository;

    public List<Sales> getAll() {
        return salesRepository.getAll();
    }

    public void add(Sales sales) {
        sales.setIsActive(true);

        int total = (int) salesRepository.count() + 1;
        int month = sales.getTransactionDate().getMonthValue();
        int day = sales.getTransactionDate().getDayOfMonth();

        int combination = (total * 10000) + (day * 100) + month;

        sales.setInvoiceNumber(combination);
        salesRepository.save(sales);
        
        if(sales.getIdCar() != 0){
            unitRepository.deleteUnit(sales.getIdCar());
        }
    }

    public void update(Sales sales) {
        salesRepository.save(sales);
    }

    public void deleteById(int id) {
        salesRepository.deleteSales(id);
    }

    public List<Unit> filteredUnitsByCatalog(int idCatalog) {
        return salesRepository.filteredUnitsByCatalog(idCatalog);
    }

}
