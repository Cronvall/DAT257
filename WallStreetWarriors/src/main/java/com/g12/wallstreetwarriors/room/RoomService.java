package com.g12.wallstreetwarriors.room;

import com.g12.wallstreetwarriors.user.User;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class RoomService {
    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    Optional<Room> getRoomById(Long id){
        return roomRepository.findById(id);
    }

    List<Room> getRooms(){
        return roomRepository.findAll();
    }

    Room createRoom(Room newRoom) {
        Random rnd = new Random();
        int code = rnd.nextInt(100000,999999);
        newRoom.setCode(code);
        return roomRepository.save(newRoom);
    }

    Optional<Room> addUser(User user, Room room, Integer code) {
        Optional<Room> room2 = roomRepository.findRoomById(room.getId());
        if (room2.isPresent() && code.equals(room2.get().getCode())) {
            room2.get().addMember(user);
            roomRepository.save(room2.get());
        }
        return room2;
    }



}
