/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.repository;

import cr.ac.ucr.ie.fast506.domain.Catalog;
import cr.ac.ucr.ie.fast506.domain.UnitGroup;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CatalogRepository extends JpaRepository<Catalog, Integer> {

    @Query(value = "call db_fast506.getAllCatalogs()", nativeQuery = true)//permite ejecular un sp con jpa
    List<Catalog> getAll();//mapea los objetos

    @Modifying
    @Transactional
    @Query(value = "CALL db_fast506.deleteCatalog(:idCatalog)", nativeQuery = true)
    void deleteCatalog(@Param("idCatalog") Integer idCatalog);
    
    @Query(value = "call db_fast506.units_groud_exists()", nativeQuery = true)
    List<UnitGroup> getUnitsNotInCatalog();

}
