package com.g12.wallstreetwarriors.room;

import com.g12.wallstreetwarriors.stockTransaction.*;
import com.g12.wallstreetwarriors.user.User;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final MembersRepository membersRepository;
    private final StockRepository stockRepository;
    private boolean change;



    public RoomService(RoomRepository roomRepository, MembersRepository membersRepository, StockRepository stockRepository) {
        this.roomRepository = roomRepository;
        this.membersRepository = membersRepository;
        this.stockRepository = stockRepository;
        change = true;
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
        Members member = new Members();
        if (code.equals(room.getCode())) {
            if(change) {
                member.setRoom(room);
                member.setUser(user);
                member.setTicker("AAPL");
                membersRepository.save(member);
                change = !change;
            }
            else{
                member.setRoom(room);
                member.setUser(user);
                member.setTicker("GTX");
                membersRepository.save(member);
                change = !change;
            }


        }
        return room;
    }

    public Optional<Room> getRoomByCode(Integer code) {
        return roomRepository.findRoomByCode(code);
    }
}
