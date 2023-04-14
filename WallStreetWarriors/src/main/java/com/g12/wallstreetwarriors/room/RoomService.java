package com.g12.wallstreetwarriors.room;

import com.g12.wallstreetwarriors.user.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    Room createRoom(User user, Room newRoom) {
        newRoom.setOwner(user);
        roomRepository.save(newRoom);
        return newRoom;
    }

    Optional<Room> addUser(User user, Room room) {
        Optional<Room> room2 = roomRepository.getRoomByCode(room.getCode());
        if (room2.isPresent()) {
            room2.get().addMember(user);
        }
        return room2;
    }

}
