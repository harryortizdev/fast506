/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.repository;

import cr.ac.ucr.ie.fast506.domain.Testdrive;
import cr.ac.ucr.ie.fast506.domain.Unit;
import jakarta.transaction.Transactional;
import java.time.LocalDate;
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
public interface TestdriveRepository extends JpaRepository<Testdrive, Integer> {

    @Query(value = "call db_fast506.getAllTestdrive()", nativeQuery = true)
    List<Testdrive> getAll();

    @Transactional // Requerido para operaciones de eliminación/modificación
    @Modifying    // Requerido para consultas de tipo DELETE / UPDATE nativas
    @Query(value = "call db_fast506.deleteTestdrive(:id_Testdrive)", nativeQuery = true)
    void deleteTestdriveByIdPA(@Param("id_Testdrive") int id_Testdrive);

    @Query(value = "call db_fast506.getOccupiedHoursByDate(:scheduled_dateS, :id_branch)", nativeQuery = true)
    List<String> findOccupiedHoursByDate(@Param("scheduled_dateS") LocalDate scheduled_dateS, @Param("id_branch") Integer idBranch);

    @Query(value = "call db_fast506.getAllCarAvailable()", nativeQuery = true)
    List<Unit> allCarAvailable();
}
