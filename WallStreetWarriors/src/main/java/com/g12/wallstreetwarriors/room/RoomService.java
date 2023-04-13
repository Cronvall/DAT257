package com.g12.wallstreetwarriors.room;

import com.g12.wallstreetwarriors.user.User;
import org.springframework.stereotype.Service;

@Service
public class RoomService {
    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    void createRoom(User user, Room newRoom) {
        newRoom.setOwner(user);
        roomRepository.save(newRoom);
    }

    void addUser(User user, Long id) {
        roomRepository.findById(id).get().addMember(user);
    }
}
