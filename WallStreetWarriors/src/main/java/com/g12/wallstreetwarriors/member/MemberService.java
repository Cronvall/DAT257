package com.g12.wallstreetwarriors.member;

import com.g12.wallstreetwarriors.room.Room;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Optional<Room> getMembersByRoomCode(Integer code){
        return memberRepository.findByRoom(code);
    }

    List<Member> getMembers(){
        return memberRepository.findAll();
    }

}
