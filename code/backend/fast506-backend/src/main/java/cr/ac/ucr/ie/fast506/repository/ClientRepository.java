/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.repository;

import cr.ac.ucr.ie.fast506.domain.Client;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ediso
 */
@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {

    Optional<Client> findByIdEquals(int id);

    @Query(value = "call getClientByCredentials(:email, :password)", nativeQuery = true)
    Client findByEmailAndPassword(@Param("email") String email, @Param("password") String password);
    
    @Query(value= "call db_fast506.deleteClientById(:id)", nativeQuery = true)
    void deleteClientById(@Param("id") int id);

    @Query(value = "call db_fast506.getAllClients()", nativeQuery = true)
    List<Client> getAllClients();

}
