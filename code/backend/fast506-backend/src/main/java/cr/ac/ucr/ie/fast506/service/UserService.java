/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.domain.User;
import cr.ac.ucr.ie.fast506.repository.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author ediso
 */
@Service
public class UserService {
    
    @Autowired
    UserRepository userRepository;

    public Optional<User> findById(int id) {
        return userRepository.findById(id);
    }

}
