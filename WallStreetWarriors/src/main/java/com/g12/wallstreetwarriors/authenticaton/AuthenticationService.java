package com.g12.wallstreetwarriors.authenticaton;

import java.util.Optional;

import com.g12.wallstreetwarriors.user.User;
import com.g12.wallstreetwarriors.user.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final UserRepository userRepository;

    public AuthenticationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    Optional<User> authenticateUser(String username) {
        return userRepository.getUserByUsername(username);
    }
}
