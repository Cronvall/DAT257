package com.g12.wallstreetwarriors.authenticaton;


import com.g12.wallstreetwarriors.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import java.util.Optional;

@RestController
public class AuthenticationController {

    private final AuthenticationService AuthenticationService;

    public AuthenticationController(AuthenticationService AuthenticationService) {
        this.AuthenticationService = AuthenticationService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/authentication")
    ResponseEntity<?> authenticateUser(@RequestBody String username, String password) {
        Optional<User> user = AuthenticationService.authenticateUser(username);
        System.out.println("USER IN AUTH= " + user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
        //Optional<> user = AuthenticationService.authenticateUser(username);
        //if(user != null){
          //  return ResponseEntity<User>(user, )
        //}

       // return new ResponseEntity<User>(;
    }
}
