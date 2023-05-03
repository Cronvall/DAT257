package com.g12.wallstreetwarriors.stockTransaction;


import io.netty.handler.codec.http2.Http2Stream;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/members")
public class MembersController {

    private final MembersService membersService;


    public MembersController(MembersService membersService) {
        this.membersService = membersService;
    }

    @GetMapping
    ResponseEntity<List<Members>> getMembers(){
        return new ResponseEntity<>(membersService.getMembers(), HttpStatus.OK);
    }
}
