package com.g12.wallstreetwarriors.user;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    User addUser(User user) {
        return userRepository.save(user);
    }
}
