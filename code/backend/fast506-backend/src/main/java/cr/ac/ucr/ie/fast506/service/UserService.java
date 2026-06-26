package cr.ac.ucr.ie.fast506.service;

import cr.ac.ucr.ie.fast506.domain.User;
import cr.ac.ucr.ie.fast506.repository.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public Optional<User> findById(int id) {
        return userRepository.findById(id);
    }

    @Transactional(readOnly = true)
    public Optional<User> login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.isIsActive() && user.getPassword().equals(password));
    }

    @Transactional(readOnly = true)
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Transactional
    public void updatePassword(String email, String newPassword) {
        userRepository.findByEmail(email).ifPresent(user -> {
            user.setPassword(newPassword);
            userRepository.save(user);
        });
    }
}
