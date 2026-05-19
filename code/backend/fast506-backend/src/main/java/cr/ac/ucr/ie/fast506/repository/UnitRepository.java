/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.repository;

import cr.ac.ucr.ie.fast506.domain.Unit;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UnitRepository extends JpaRepository<Unit, Integer> {

    @Query(value = "call db_fast506.getAllUnits()", nativeQuery = true)//permite ejecular un sp con jpa
    List<Unit> getAll();//mapea los objetos

    @Query(value = "CALL db_fast506.findUnitByVIN(:vin)", nativeQuery = true)
    Unit existsByVIN(@Param("vin") String vin); //mapea la unidad encontrada

    @Modifying
    @Transactional
    @Query(value = "call db_fast506.deleteUnit(:id_Car)", nativeQuery = true)
    void deleteUnit(@Param("id_Car") Integer id_Car);

}
