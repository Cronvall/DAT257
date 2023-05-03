package com.g12.wallstreetwarriors.stockTransaction;

import com.g12.wallstreetwarriors.room.Room;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MembersService {

    private final MembersRepository membersRepository;

    public MembersService(MembersRepository membersRepository) {
        this.membersRepository = membersRepository;
    }

    public Optional<Room> getMembersByRoomCode(Integer code){
        return membersRepository.findByRoom(code);
    }

    List<Members> getMembers(){
        return membersRepository.findAll();
    }

}
