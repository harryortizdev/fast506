/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.repository;

import cr.ac.ucr.ie.fast506.domain.Quotation;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author ediso
 */
public interface QuotationRepository extends JpaRepository<Quotation, Integer> {
    
    @Query(value = "call db_fast506.getAllQuotation()", nativeQuery = true)
    List<Quotation> getAll();

    @Transactional
    @Modifying   
    @Query(value = "call db_fast506.deleteQuotation(:id_Quotation)", nativeQuery = true)
    void deleteQuotationByIdPA(@Param("id_Quotation") int id_Quotation);
}
