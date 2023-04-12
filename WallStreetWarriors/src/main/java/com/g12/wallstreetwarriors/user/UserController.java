package com.g12.wallstreetwarriors.user;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import java.util.Collection;
import java.util.Optional;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users")
    ResponseEntity<User> addUser(@RequestBody User newUser) {
        return new ResponseEntity<>(userService.addUser(newUser), HttpStatus.CREATED);
    }

    @GetMapping("/users")
    ResponseEntity<Collection<User>> getUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
