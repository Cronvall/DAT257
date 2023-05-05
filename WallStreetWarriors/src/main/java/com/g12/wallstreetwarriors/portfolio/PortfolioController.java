package com.g12.wallstreetwarriors.portfolio;


import com.g12.wallstreetwarriors.room.Room;
import com.g12.wallstreetwarriors.user.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static java.lang.Long.parseLong;

@RestController
@RequestMapping("/portfolios")
public class PortfolioController {

    private final PortfolioRepository portfolioRepository;

    public PortfolioController(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }
/*
    @GetMapping
    ResponseEntity<Portfolio> getPortfolio(@RequestParam Map<String, String> requestParams){
        System.out.println(requestParams.get("roomId"));
        System.out.println(requestParams.get("userId"));
        Long roomId = parseLong(requestParams.get("roomId"));
        Long userId = parseLong(requestParams.get("userId"));
        System.out.println(roomId);
        System.out.println(userId);
        return new ResponseEntity<>(portfolioRepository.findByMember_UserIdAndMember_RoomId(userId, roomId).get(), HttpStatus.OK);
    }*/

    @GetMapping
    ResponseEntity<List<Portfolio>> getPortfolios(){
        return new ResponseEntity<>(portfolioRepository.findAll(), HttpStatus.OK);
    }

}
