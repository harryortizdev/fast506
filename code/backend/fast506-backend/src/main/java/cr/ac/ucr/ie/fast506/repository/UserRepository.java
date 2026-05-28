/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.repository;

import cr.ac.ucr.ie.fast506.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author ediso
 */
public interface UserRepository extends JpaRepository<User, Integer> {
    
}
