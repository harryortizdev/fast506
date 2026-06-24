/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.repository;

import cr.ac.ucr.ie.fast506.domain.Administrator;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdministratorRespository extends JpaRepository<Administrator, Integer> {

    @Query(value = "call getAdminByCredentials(:email, :password)", nativeQuery = true)
    Administrator findByEmailAndPassword(@Param("email") String email, @Param("password") String password);

    @Query(value = "call db_fast506.getAllAdministrators()", nativeQuery = true)
    List<Administrator> getAll();

    @Modifying
    @Transactional
    @Query(value = "call db_fast506.deleteUser(:id)", nativeQuery = true)
    void deleteAdministrator(@Param("id") int id);

    @Query(value = "call db_fast506.findAdministratorById(:id)", nativeQuery = true)
    Administrator findAdministratorById(@Param("id") int id);

}
