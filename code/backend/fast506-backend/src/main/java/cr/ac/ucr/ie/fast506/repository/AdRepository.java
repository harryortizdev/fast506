/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.repository;

import cr.ac.ucr.ie.fast506.domain.Ad;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ediso
 */
@Repository
public interface AdRepository extends JpaRepository<Ad, Integer> {
    @Query(value = "call db_fast506.getAllAd()", nativeQuery = true)//permite ejecular un sp con jpa
    List<Ad> getAll();//mapea los objetos
    
    @Transactional // Requerido para operaciones de eliminación/modificación
    @Modifying    // Requerido para consultas de tipo DELETE / UPDATE nativas
    @Query(value = "call db_fast506.deleteAd(:id_Ad)", nativeQuery = true)
    void deleteAdByIdPA(@Param("id_Ad") int id_Ad);
}
