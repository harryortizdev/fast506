package cr.ac.ucr.ie.fast506.controller;

import cr.ac.ucr.ie.fast506.domain.Role;
import cr.ac.ucr.ie.fast506.domain.User;
import cr.ac.ucr.ie.fast506.service.UserService;
import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestBody LoginRequest request, HttpSession session) {

        Optional<User> userOpt = userService.login(request.getEmail(), request.getPassword());

        if (userOpt.isEmpty()) {
            Map<String, Object> error = new HashMap<>();
            error.put("authenticated", false);
            error.put("message", "Credenciales incorrectas o usuario inactivo");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        User user = userOpt.get();
        Role role = user.getRole();

        session.setAttribute("userId", user.getIdUser());
        session.setAttribute("userName", user.getName());
        session.setAttribute("userEmail", user.getEmail());

        if (role != null) {
            session.setAttribute("roleId", role.getIdRole());
            session.setAttribute("roleName", role.getName());
        }

        Map<String, Object> response = new HashMap<>();
        response.put("authenticated", true);
        response.put("userId", user.getIdUser());
        response.put("name", user.getName());
        response.put("email", user.getEmail());
        response.put("roleId", role != null ? role.getIdRole() : null);
        response.put("roleName", role != null ? role.getName() : null);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> me(HttpSession session) {
        Integer userId = (Integer) session.getAttribute("userId");

        if (userId == null) {
            Map<String, Object> error = new HashMap<>();
            error.put("authenticated", false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("authenticated", true);
        response.put("userId", userId);
        response.put("name", session.getAttribute("userName"));
        response.put("email", session.getAttribute("userEmail"));
        response.put("roleId", session.getAttribute("roleId"));
        response.put("roleName", session.getAttribute("roleName"));

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpSession session) {
        session.invalidate();
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Sesión cerrada exitosamente");
        return ResponseEntity.ok(response);
    }

    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
