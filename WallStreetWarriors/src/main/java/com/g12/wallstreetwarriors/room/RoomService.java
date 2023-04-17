package com.g12.wallstreetwarriors.room;

import com.g12.wallstreetwarriors.user.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
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

    Room createRoom(Room newRoom) {
        roomRepository.save(newRoom);
        return newRoom;
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
