package com.g12.wallstreetwarriors.room;

import com.g12.wallstreetwarriors.member.Member;
import com.g12.wallstreetwarriors.member.MemberRepository;
import com.g12.wallstreetwarriors.member.MemberService;
import com.g12.wallstreetwarriors.portfolio.Portfolio;
import com.g12.wallstreetwarriors.stock.*;
import com.g12.wallstreetwarriors.user.User;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final MemberRepository memberRepository;

    private final MemberService memberService;



    public RoomService(RoomRepository roomRepository, MemberRepository memberRepository, MemberService memberService) {
        this.roomRepository = roomRepository;
        this.memberRepository = memberRepository;
        this.memberService = memberService;
    }

    Room getRoomById(Long id) throws Exception {
        Optional<Room> room = roomRepository.findById(id);
        if(room.isPresent()) {
            return room.get();
        } else {
            throw new Exception();
        }
    }

    List<Room> getRooms(){
        return roomRepository.findAll();
    }

    List<Room> getUserRooms(Long userId) {
        List<Room> rooms = new ArrayList<>();
        List<Member> members = memberRepository.findAllByUserId(userId);
        for (Member member : members) {
            rooms.add(member.getRoom());
        }
        return rooms;
    }

    Room createRoom(Room newRoom) {
        Random rnd = new Random();

        int code = rnd.nextInt(999999);

        newRoom.setCode(code);
        newRoom = roomRepository.save(newRoom);

        Member member = new Member();
        member.setUser(newRoom.getOwner());
        member.setRoom(newRoom);
        memberRepository.save(member);
        newRoom.addMember(member);
        roomRepository.save(newRoom);

        return newRoom;

    }

    Room addMember(User user, Room room) {
        Member member = memberService.createMember(user, room);
        memberRepository.save(member);
        return room;
    }

    Boolean roomCodeIsValid(Integer roomCode, Integer code) {
        return code.equals(roomCode);
    }

    public Optional<Room> getRoomByCode(Integer code) {
        return roomRepository.findRoomByCode(code);
    }
}
