/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.repository;

import cr.ac.ucr.ie.fast506.domain.Branch;
import org.springframework.stereotype.Repository;

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
@Repository
public interface BranchRepository extends JpaRepository<Branch, Integer> {
    
    @Query(value = "call db_fast506.getAllBranch()", nativeQuery = true)//permite ejecular un sp con jpa
    List<Branch> getAll();//mapea los objetos
    
    @Transactional // Requerido para operaciones de eliminación/modificación
    @Modifying    // Requerido para consultas de tipo DELETE / UPDATE nativas
    @Query(value = "call db_fast506.deleteBranch(:id_Branch)", nativeQuery = true)
    void deleteBranchByIdPA(@Param("id_Branch") int id_Branch);
}
