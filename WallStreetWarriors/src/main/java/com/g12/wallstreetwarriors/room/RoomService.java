package com.g12.wallstreetwarriors.room;

import com.g12.wallstreetwarriors.stockTransaction.Members;
import com.g12.wallstreetwarriors.stockTransaction.MembersRepository;
import com.g12.wallstreetwarriors.user.User;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final MembersRepository membersRepository;

    public RoomService(RoomRepository roomRepository, MembersRepository membersRepository) {
        this.roomRepository = roomRepository;
        this.membersRepository = membersRepository;
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
            Members member = new Members();
            member.setRoom(room);
            member.setUser(user);
            member.setTicker("AAPL");
            membersRepository.save(member);
        }
        return room;
    }


    public Optional<Room> getRoomByCode(Integer code) {
        return roomRepository.findRoomByCode(code);
    }
}
