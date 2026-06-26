package cr.ac.ucr.ie.fast506.controller;

import cr.ac.ucr.ie.fast506.domain.Role;
import cr.ac.ucr.ie.fast506.domain.User;
import cr.ac.ucr.ie.fast506.service.EmailService;
import cr.ac.ucr.ie.fast506.service.UserService;
import jakarta.servlet.http.HttpSession;
import java.security.SecureRandom;
import java.time.Instant;
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

    @Autowired
    private EmailService emailService;

    private static final int MAX_LOGIN_ATTEMPTS = 3;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestBody LoginRequest request, HttpSession session) {

        Integer attempts = (Integer) session.getAttribute("login_attempts");
        if (attempts == null) attempts = 0;

        Optional<User> userOpt = userService.login(request.getEmail(), request.getPassword());

        if (userOpt.isEmpty()) {
            attempts++;
            session.setAttribute("login_attempts", attempts);

            if (attempts >= MAX_LOGIN_ATTEMPTS) {
                Map<String, Object> error = new HashMap<>();
                error.put("authenticated", false);
                error.put("recoverRequired", true);
                error.put("message", "Demasiados intentos fallidos");
                return ResponseEntity.status(HttpStatus.LOCKED).body(error);
            }

            Map<String, Object> error = new HashMap<>();
            error.put("authenticated", false);
            error.put("message", "Credenciales incorrectas o usuario inactivo");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        User user = userOpt.get();
        Role role = user.getRole();

        session.setAttribute("login_attempts", 0);
        session.setAttribute("userId", user.getIdUser());
        session.setAttribute("userName", user.getName());
        session.setAttribute("userEmail", user.getEmail());
        session.setAttribute("profileImage", user.getProfileImage());

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
        response.put("profileImage", user.getProfileImage());

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
        response.put("profileImage", session.getAttribute("profileImage"));

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(HttpSession session) {
        session.invalidate();
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Sesión cerrada exitosamente");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<Map<String, Object>> forgotPassword(
            @RequestBody ForgotPasswordRequest request, HttpSession session) {

        Optional<User> userOpt = userService.findByEmail(request.getEmail());

        if (userOpt.isPresent()) {
            String code = String.format("%06d", new SecureRandom().nextInt(1_000_000));
            Instant expiration = Instant.now().plusSeconds(600);

            session.setAttribute("reset_code", code);
            session.setAttribute("reset_email", request.getEmail());
            session.setAttribute("reset_expiration", expiration);
            session.setAttribute("password_reset_verified", false);

            try {
                emailService.sendPasswordReset(request.getEmail(), code);
            } catch (Exception ignored) {
                // No revelar si el envío falló
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Si el correo existe se enviaron instrucciones");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/verify-code")
    public ResponseEntity<Map<String, Object>> verifyCode(
            @RequestBody VerifyCodeRequest request, HttpSession session) {

        String storedCode = (String) session.getAttribute("reset_code");
        Instant expiration = (Instant) session.getAttribute("reset_expiration");

        Map<String, Object> response = new HashMap<>();

        if (storedCode == null || expiration == null
                || Instant.now().isAfter(expiration)
                || !storedCode.equals(request.getCode())) {
            response.put("verified", false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        session.setAttribute("password_reset_verified", true);
        response.put("verified", true);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, Object>> resetPassword(
            @RequestBody ResetPasswordRequest request, HttpSession session) {

        Boolean verified = (Boolean) session.getAttribute("password_reset_verified");
        String email = (String) session.getAttribute("reset_email");

        Map<String, Object> response = new HashMap<>();

        if (!Boolean.TRUE.equals(verified) || email == null) {
            response.put("message", "No autorizado");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        userService.updatePassword(email, request.getNewPassword());

        session.removeAttribute("reset_code");
        session.removeAttribute("reset_email");
        session.removeAttribute("reset_expiration");
        session.removeAttribute("password_reset_verified");
        session.setAttribute("login_attempts", 0);

        response.put("message", "Contraseña actualizada");
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

    public static class ForgotPasswordRequest {
        private String email;
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }

    public static class VerifyCodeRequest {
        private String code;
        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }
    }

    public static class ResetPasswordRequest {
        private String newPassword;
        public String getNewPassword() { return newPassword; }
        public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    }
}
