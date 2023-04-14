package com.g12.wallstreetwarriors.user;

import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    User addUser(User user) {
        return userRepository.save(user);
    }

    Collection<User> getUsers() {
        return userRepository.findAll();
    }

    Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
}