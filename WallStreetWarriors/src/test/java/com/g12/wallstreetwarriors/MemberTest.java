/*package com.g12.wallstreetwarriors;

import com.g12.wallstreetwarriors.room.Room;
import com.g12.wallstreetwarriors.room.RoomService;
import com.g12.wallstreetwarriors.member.MemberRepository;
import com.g12.wallstreetwarriors.member.MemberService;
import com.g12.wallstreetwarriors.user.User;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest

public class MemberTest {

    private final RoomService roomService;
    private final MemberRepository memberRepository;

    public MemberTest(RoomService roomService, MemberService memberService, MemberRepository memberRepository) {
        this.roomService = roomService;
        this.memberRepository = memberRepository;
    }

    @Test
    void addMember() {
        User user = User.builder().username("uname1").password("Pass111").email("email1@gmail.com").build();
        Room room = Room.builder().owner(user).name("IT").code(12).budget(10000).capacity(5).build();

        //Members member = new Members(room,user, "");
        //return membersRepository.save(member);


    }

}
*/