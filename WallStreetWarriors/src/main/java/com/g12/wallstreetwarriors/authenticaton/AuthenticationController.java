package com.g12.wallstreetwarriors.authenticaton;


import java.util.Optional;

import com.g12.wallstreetwarriors.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/authentication")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    private final PasswordEncoder passwordEncoder;

    public AuthenticationController(AuthenticationService authenticationService, PasswordEncoder passwordEncoder) {
        this.authenticationService = authenticationService;
        this.passwordEncoder = passwordEncoder;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    ResponseEntity<?> authenticateUser(@RequestBody User authUser) {
        try {
            Optional<User> user = authenticationService.authenticateUser(authUser.getUsername());

            if (user.isPresent()) {
                if (passwordEncoder.matches(authUser.getPassword(), user.get().getPassword())) {
                    return new ResponseEntity<>(user, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>("Invalid password", HttpStatus.UNAUTHORIZED);
                }
            } else {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }

        }catch(Exception e){
            // Handle unhandled runtime exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during authentication");
        }
    }
}



