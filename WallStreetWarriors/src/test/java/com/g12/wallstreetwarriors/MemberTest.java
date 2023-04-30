package com.g12.wallstreetwarriors;

import com.g12.wallstreetwarriors.room.Room;
import com.g12.wallstreetwarriors.room.RoomService;
import com.g12.wallstreetwarriors.stockTransaction.Members;
import com.g12.wallstreetwarriors.stockTransaction.MembersRepository;
import com.g12.wallstreetwarriors.stockTransaction.MembersService;
import com.g12.wallstreetwarriors.user.User;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest

public class MemberTest {

    private final RoomService roomService;
    private final MembersRepository membersRepository;

    public MemberTest(RoomService roomService, MembersService membersService, MembersRepository membersRepository) {
        this.roomService = roomService;
        this.membersRepository = membersRepository;
    }

    @Test
    void addMember() {
        User user = User.builder().username("uname1").password("Pass111").email("email1@gmail.com").build();
        Room room = Room.builder().owner(user).name("IT").code(12).budget(10000).capacity(5).build();

        //Members member = new Members(room,user, "");
        //return membersRepository.save(member);


    }

}
