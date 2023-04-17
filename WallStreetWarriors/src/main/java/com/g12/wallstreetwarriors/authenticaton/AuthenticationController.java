package com.g12.wallstreetwarriors.authenticaton;

import com.g12.wallstreetwarriors.user.User;
import com.g12.wallstreetwarriors.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;


public class AuthenticationController {

    public AuthenticationController() {
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/users")
    ResponseEntity<User> addUser(@RequestBody User newUser) {
        return new ResponseEntity<>(userService.addUser(newUser), HttpStatus.CREATED);
    }

}
