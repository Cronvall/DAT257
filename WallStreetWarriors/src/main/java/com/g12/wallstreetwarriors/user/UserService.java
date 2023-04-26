package com.g12.wallstreetwarriors.user;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
class UserService {


    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public UserService(PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    User addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    Collection<User> getUsers() {
        return userRepository.findAll();
    }

    Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    Optional<User> getUserByUsername(String username) {
        Optional<User> user = userRepository.getUserByUsername(username);
        System.out.println("USER IN USERSERV = " + user);
        if(user.isPresent()){
            System.out.println("USER IS PRESENT");
            return user;
        }else{
            return null;
        }
    }
}
