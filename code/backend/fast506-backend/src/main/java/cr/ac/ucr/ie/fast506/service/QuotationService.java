/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.domain.Catalog;
import cr.ac.ucr.ie.fast506.domain.Quotation;
import cr.ac.ucr.ie.fast506.domain.Unit;
import cr.ac.ucr.ie.fast506.repository.QuotationRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ediso
 */
@Service
public class QuotationService {

    @Autowired
    private QuotationRepository quotationRepository;

    public List<Quotation> getAll() {
        return quotationRepository.getAll();
    }

    public void add(Quotation quotation) {
        quotation.setIsActive(true);

        int total = (int) quotationRepository.count() + 1;
        int month = quotation.getDate().getMonthValue();
        int day = quotation.getDate().getDayOfMonth();
        
        int combination = (total * 10000) + (day * 100) + month;

        quotation.setReferenceNumber(combination);
        quotationRepository.save(quotation);
    }

    public void update(Quotation quotation) {
        quotationRepository.save(quotation);
    }

    public void deleteById(int id) {
        quotationRepository.deleteQuotationByIdPA(id);
    }

    public List<Unit> filteredUnitsByCatalog(int idCatalog) {
        return quotationRepository.filteredUnitsByCatalog(idCatalog);
    }

}
