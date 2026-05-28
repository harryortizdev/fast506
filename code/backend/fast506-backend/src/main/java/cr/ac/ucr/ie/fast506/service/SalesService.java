/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.domain.Administrator;
import cr.ac.ucr.ie.fast506.domain.Sales;
import cr.ac.ucr.ie.fast506.domain.Unit;
import cr.ac.ucr.ie.fast506.repository.AdministratorRespository;
import cr.ac.ucr.ie.fast506.repository.CatalogRepository;
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

    @Autowired
    private AdministratorRespository adminRepository;

    @Autowired
    private CatalogRepository catalogRepository;

    public List<Sales> getAll() {
        return salesRepository.getAll();
    }

    public void add(Sales sales) {
        sales.setIsActive(true);
        setSalesStatus(sales);
        sales.setInvoiceNumber(generateInvoiceNumber(sales));
        salesRepository.save(sales);
        if (sales.getIdCar() != 0 && "Completada".equals(sales.getSalesStatus())) {
            processCompletedSale(sales);
        }
    }

    public void update(Sales sales) {
        salesRepository.save(sales);
        if (sales.getIdCar() != 0 && "Completada".equals(sales.getSalesStatus())) {
            unitRepository.deleteUnit(sales.getIdCar());
        }
    }

    public void deleteById(int id) {
        salesRepository.deleteSales(id);
    }

    public List<Unit> filteredUnitsByCatalog(int idCatalog) {
        return salesRepository.filteredUnitsByCatalog(idCatalog);
    }

    public List<Unit> filteredUnitsByColor(int idCatalog, String traction) {
        return salesRepository.filteredUnitsByColor(idCatalog, traction);
    }

    private void setSalesStatus(Sales sales) {
        if (sales.getIdAdmin() != null && sales.getIdAdmin() > 0) {
            sales.setSalesStatus("Completada");
        } else {
            sales.setSalesStatus("Pendiente");
        }
    }

    private int generateInvoiceNumber(Sales sales) {
        int year = sales.getTransactionDate().getYear();
        int month = sales.getTransactionDate().getMonthValue();
        int day = sales.getTransactionDate().getDayOfMonth();
        int unique = (int) (System.currentTimeMillis() % 10000);
        return (year % 100) * 1000000 + month * 10000 + day * 100 + unique;
    }

    private void processCompletedSale(Sales sales) {

        unitRepository.deleteUnit(sales.getIdCar());

        unitRepository.flush();

        int total = catalogRepository.countUnitsByCatalog(
                sales.getIdCatalog()
        );

        System.out.println("TOTAL: " + total);

        if (total == 0) {

            catalogRepository.deleteCatalog(
                    sales.getIdCatalog()
            );

            System.out.println("CATALOGO ELIMINADO");
        }
    }

}
