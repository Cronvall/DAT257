package com.g12.wallstreetwarriors.authenticaton;

import com.g12.wallstreetwarriors.user.User;
import com.g12.wallstreetwarriors.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
class AuthenticationService {

    private final UserRepository userRepository;

    public AuthenticationService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    Optional<User> authenticateUser(String username) {
        System.out.println("auth serveice usernaem " + username);
        Optional<User> user = userRepository.getUserByUsername(username);
        if(user.isPresent()){
            return user;
        }else{
            return null;
        }
    }
}
