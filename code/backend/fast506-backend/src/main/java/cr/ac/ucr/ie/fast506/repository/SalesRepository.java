/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.repository;

import cr.ac.ucr.ie.fast506.domain.Sales;
import cr.ac.ucr.ie.fast506.domain.Unit;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Harry Ortiz
 */
@Repository
public interface SalesRepository extends JpaRepository<Sales, Integer> {

    @Query(value = "call db_fast506.getAllSales()", nativeQuery = true)
    List<Sales> getAll();

    @Modifying
    @Transactional
    @Query(value = "call db_fast506.deleteSales(:idSales)", nativeQuery = true)
    void deleteSales(@Param("id_Sales") Integer idSales);

    @Query(value = "call db_fast506.getUnitsByCatalog(:id_Catalog)", nativeQuery = true)
    List<Unit> filteredUnitsByCatalog(@Param("id_Catalog") int id_Catalog);
    
    @Query(value = "call db_fast506.getColorsByCatalogAndTraction(:id_Catalog, :traction)", nativeQuery = true)
    List<Unit> filteredUnitsByColor(@Param("id_Catalog") int id_Catalog, @Param("traction") String traction);
  
}
