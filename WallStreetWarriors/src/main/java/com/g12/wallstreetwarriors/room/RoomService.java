package com.g12.wallstreetwarriors.room;

import com.g12.wallstreetwarriors.portfolio.Portfolio;
import com.g12.wallstreetwarriors.stockTransaction.*;
import com.g12.wallstreetwarriors.user.User;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final MembersRepository membersRepository;
    private final StockRepository stockRepository;



    public RoomService(RoomRepository roomRepository, MembersRepository membersRepository, StockRepository stockRepository) {
        this.roomRepository = roomRepository;
        this.membersRepository = membersRepository;

        this.stockRepository = stockRepository;
    }

    Optional<Room> getRoomById(Long id){
        return roomRepository.findById(id);
    }

    List<Room> getRooms(){
        return roomRepository.findAll();
    }

    Room createRoom(Room newRoom) {
        Random rnd = new Random();

        int code = rnd.nextInt(999999);

        newRoom.setCode(code);
        return roomRepository.save(newRoom);
    }

    Room addMember(User user, Room room, Integer code) {
        if (code.equals(room.getCode())) {
            Stock stock = new Stock();
            Stock stock1 = new Stock();
            Portfolio portfolio = new Portfolio();
            stock.setTicker("AAPL");
            stock1.setTicker("MSFT");
            portfolio.setStocks(List.of(stock, stock1));
                Members member = new Members();
                member.setRoom(room);
                member.setUser(user);
                member.setPortfolio(portfolio);
                //member.setStocks(List.of(stock));
                membersRepository.save(member);


        }
        return room;
    }

    public Optional<Room> getRoomByCode(Integer code) {
        return roomRepository.findRoomByCode(code);
    }
}
